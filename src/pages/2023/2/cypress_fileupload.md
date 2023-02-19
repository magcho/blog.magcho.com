---
layout: post
title: cypressでドラッグ & ドロップとCtrl-vのファイルアップロードをテストする
category: プログラミング
date: 2023-02-19
tags:
  - Cypress
  - フロントエンド
---

ファイルアップロードをするUIとしてクリックするとOSのファイラーが開いて選択するタイプ、ドラッグ&ドロップでブラウザ外からファイルを持ってくるタイプ、クリップボードにファイルを保持した状態で<kbd>Ctrl-v</kbd>で貼り付けるタイプなどさまざまなUIがあります。
それらについてE2EテストフレームワークであるCypressでどのようにユーザー行動を再現するかのメモです

## ドラッグ&ドロップでファイル選択

例えばこんなUIです↓

<iframe src="https://codesandbox.io/embed/react-uploady-paste-to-upload-demo-usx9s?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-uploady paste-to-upload demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

CypressにはClickやTypeなど、ユーザー行動をエミュレートするいくつかのAction[^1]が用意されていますが、ドラッグ&ドロップに相当するDropイベントは用意されていなため自分でActionを追加して対応します。

Actionを自分で追加するにはCostom Commands[^2]という仕組みを利用します、似たようなことをされている方もいたので参考にしています https://gist.github.com/nickytonline/bcdef8ef00211b0faf7c7c0e7777aaf6

こういったドロップのUIを作る際にはJSのdropイベント[^3]を利用すると思いますのでCypressでは対象のエレメントにdropイベントをdispatchするActionを追加する時は以下の記述です。

```javascript:title=cypress/support/commands.js
Cypress.Commands.add('dropFile', { prevSubject: true }, (subject, options) => {
  const { file } = options
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(file)

  // https://developer.mozilla.org/ja/docs/Web/API/DragEvent/DragEvent
  const dropEvent = new DragEvent('drop', {
    dataTransfer,
  })

  subject[0].dispatchEvent(dropEvent)

  return subject
})
```

利用する際には`cy.readfile`[^4]を利用してこのようになります

```javascript:title=hoge.spec.js
describe('ファイルフォーム', () => {
  it('ドラッグ&ドロップでファイルを選択できる', () => {
    cy.readFile('cypress/fixtures/hoge.png', null).then((file) => {
      const fileObject = new File([file.buffer], 'test.png', { type: 'image/png' })
      cy.get('#upload-area').dropFile({
        file: fileObject,
      })
    })
  })
})
```

DataTransferItemsにfileを追加する方法は何通りかあるかと思いますがここでは`DataTransfer.items.add()`を使っています、対象ブラウザによって動かない場合がありますので調整してください。執筆時点のChrome/Firefoxでは動きました。

## `Ctrl-v`でファイル貼り付け

こちらも同様に以下のコマンドを追加します。

```javascript:title=cypress/support/commands.js
Cypress.Commands.add('pasteFile', { prevSubject: true }, (subject, options) => {
  const { file } = options
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
  const clipboardData = new DataTransfer()
  clipboardData.items.add(file)

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  const pasteEvent = new ClipboardEvent('paste', {
    bubbles: true,
    cancelable: true,
    dataType: file.type,
    clipboardData,
  })

  subject[0].dispatchEvent(pasteEvent)

  return subject
})
```

```javascript:title=hoge.spec.js
describe('ファイルフォーム', () => {
  it('Ctrl-vでファイルを選択できる', () => {
    cy.readFile('cypress/fixtures/hoge.png', null).then((file) => {
      const fileObject = new File([file.buffer], 'test.png', { type: 'image/png' })
      cy.get('#upload-area').pasteFile({
        file: fileObject,
      })
    })
  })
})
```

これでファイルアップロード周りの検証をE2Eに任せて安眠できます、おしまい。

[^1]: https://docs.cypress.io/api/commands/check
[^2]: https://docs.cypress.io/api/cypress-api/custom-commands
[^3]: https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/drop_event
[^4]: https://docs.cypress.io/api/commands/readfile
