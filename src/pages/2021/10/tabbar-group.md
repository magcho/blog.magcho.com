---
layout: post
title: Emacsのtabbar-modeをProjectごとに切り替える
category: プログラミング
date: 2021-10-19
tags:
  - emacs
---

EmacsにTabを追加するパッケージであるtabbar.elを使っています。このパッケージはBuffer名をエディタ上部に並べてくれる機能を提供します。

tabbar.elには標準でmajor modeごとにタブグループを作る機能があります、このグルーピングをproject名(.gitディレクトリが入っているディレクトリ名)ごとにまとめてVSCodeのマルチウィンドウのように扱いたかったので以下のようにして解決しました。

```elisp:title=init.el
(leaf tabbar
  :url "https://github.com/dholm/tabbar"
  :ensure t
  :defun (my/tabbar-buffer-groups
          projectile-project-name
          projectile-project-root)
  :custom (tabbar-buffer-groups-function . 'my/tabbar-buffer-groups)
  :global-minor-mode t
  :custom-face
  :init
  (defun my/tabbar-buffer-groups ()
    (list
     (cond
      ;; check project name by projectile.el
      ((projectile-project-name (projectile-project-root (buffer-file-name (current-buffer)))))
      ;; fallback default name
      ("default")
      )
     )
    )
  )
```

projectile.elに依存しているので別途設定が必要です。
