Railsをbrowserifyと組み合わせるサンプル実装

typescriptとmarionette.jsを利用している。

## How to deploy on Heroku
Heroku上でJSビルド作業を行うため、Rakefileで`assets:precompile`タスクを上書きしている。

単純にHerokuにデプロイしただけではnode.jsが利用できないため、Custom buildpackを利用する。

[joker1007/heroku-buildpack-ruby](https://github.com/joker1007/heroku-buildpack-ruby)
(rubyのビルドパックをベースにnodejsのインストールも合わせて行う)

heroku create時にbuildpackを指定するか、heroku config:setを利用してbuildpackを指定する。

```
$ heroku config:set BUILDPACK_URL=https://github.com/joker1007/heroku-buildpack-ruby

# or

$ heroku create myapp --buildpack https://github.com/heroku/heroku-buildpack-ruby
```

Herokuデプロイ済みのサンプルアプリケーション: http://whispering-scrubland-7446.herokuapp.com/todos
