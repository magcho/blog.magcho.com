---
layout: post
title: SOAP APIを使ったメモ
category:  プログラミング
date: 2021-03-20
tags:
- SOAP
---

今日においてWEB APIといえばREST or GraphQLといったところですが、他にもいろいろな方式が考案され普及し衰退していったようです。そんな中でも衰退した方のSOAPのAPIを使うことになったけど日本語情報が少なくて困ったので覚書です。

SOAPはRPCの一種でネットワーク越しに何らかの関数を呼ぶような感覚で使えました。SOAPはRESTとは違い１つのエンドポイントに対して所定のXMLにて引数を組み立てPOSTなどで送ることで利用できます。

この所定のXMLですがプロトコル上人間が組み立てるのではなくライブラリが自動でXMLを生成してやり取りすることを想定しているようです。なのでライブラリにこの定義を読み込ませるためのスキーマーとしてWSDLというものがあります、中身はXML形式でリクエストやレスポンスの形式が定義されておりAPIを提供しているサービス側から提供されています。（自分で作るものではなさそう） 

これはApache Axisの仕様によるものですが、WDSLがAPI提供側のドキュメントになくても`https://{endpoint}?wsdl`にアクセスすると取得できる場合があります。

コーディングに入る前に、そもそもこのAPIが現存しているのかも確認したいので[SoapUI](https://www.soapui.org/)を用いて試すと良さそうです。

## リクエスト
リクエストに情報を持たせる方法として２種類ありHTTPのheaderを用いるもの（protocol binding haeder）とbodyのSOAP message（SOAP Envelope）で送る方法があります。このどちらにもheaderという概念がありますがこれらは区別しなければならないようです。

## SOAP message
呼び出す際のHTTPにXMLで呼び出したい内容を入れてリクエストすることで利用できます、フォーマットはWSDLから読み解くことができます。基本のフォーマットは
```xml
<http://schemas.xmlsoap.org/soap/envelope/envelope>
    <http://schemas.xmlsoap.org/soap/envelope/envelope/header>
        ...
    </http://schemas.xmlsoap.org/soap/envelope/envelope/header>
    <http://schemas.xmlsoap.org/soap/envelope/envelope/body>
        ...
    </http://schemas.xmlsoap.org/soap/envelope/envelope/body>
</http://schemas.xmlsoap.org/soap/envelope/envelope>
```

ですがさすがに冗長なのでXMLのnamespaceという仕様により`xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"`と宣言することで以下のように`ENV`などの任意の文字列をエイリアスとして利用するケースが多いようです。
```xml
<ENV:Envelope xmlns:ENV="http://schemas.xmlsoap.org/soap/envelope/">
   <ENV:Body>
   </ENV:Body>
 </ENV:Envelope>
```

※`<Header>~~</Header>`は中身がなければ省略可能です。

## cURLでSOAP APIを叩く

前提知識が多くRESTに比べると使いづらい印象ですが、RESTにくらべた利点としてSOAPはステートフルであることが挙げられるそうです。そのためセッションを自分で管理しながらAPIを叩くのは面倒なのでそういった場合はライブラリを利用したほうがいいですが、１回情報を問い合わせるぐらいであればライブラリを使わずにやりたいものです。


呼び出すAPIのドキュメントに書いてあると思いますがhttpヘッダーには以下のものを設定しておきます

| header         | value                              |
| -------------- | ---------------------------------- |
| Content-Type   | application/soap+xml;charset=UTF-8 |
| Accept-Charset | utf-8                              |
| SOAPAction     | {呼び出すサービス名}               |

そしてSOAP messageをxmlファイルとして保存し
```xml
<!-- message.xml -->
<soapenv:Envelope
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:req="https://example.com/req/">
    <soapenv:Header/>
    <soapenv:Body>
        <req:zipcode>
            100-0001
        </req:zipcode>
    </soapenv:Body>      
</soapenv:Envelope>
```
curlで呼び出します
```bash
curl https://endpoint.example.com/ \
  -H 'Content-Type: application/soap+xml;charset=UTF-8' \
  -H 'Accept-Charset: utf-8' \
  -H 'SOAPAction: zipcode' \
  -d @message.xml
```

このような形でライブラリを利用しなくてもSOAPのAPIが叩けます。各種言語のcurlの記述に合わせて似たようなことをすればRESTのように気軽に利用できるのではないでしょうか？
