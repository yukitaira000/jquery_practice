// API
// const settings = {
//   "url": `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
//   "method": "GET",
// }
// $.ajax(settings).done(function (response) {
//   const result = response['@graph'];
//   displayResult(result)
// }).fail(function (err) {
//   displayError(err)
// })

$(function(){
  // ページカウントの初期値
  let pageCount = 1;
  // 検索ワードに変化が無かった場合の変数
  let continueSearch = "";
  // 検索ボタンをクリックした時
  $('.search-btn').on('click', function(){
    // searchWordに検索ワードに入力した値を代入
    const searchWord = $('#search-input').val();
    // 検索ワードの値が同じでは無かった場合
    if(searchWord !== continueSearch){
      // .listsクラスの子クラスを削除する
      $('.lists').empty();
      // ページカウントを1に戻す
      pageCount =1;
      // continueSearchに検索ワードに代入された値を代入する
      continueSearch = searchWord;
      // 検索ワードが同じだった場合
    }else{
      // ページを追加し次の20件を追加表示
      pageCount++;
    }
    // API
    const settings = {
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET",
    }
    $.ajax(settings).done(function (response) {
      const result = response['@graph'];
      displayResult(result)
      // console.log(result)
      // console.log(pageCount)
    }).fail(function (err) {
      displayError(err)
    })
  })
  // 通信成功時の処理
  function displayResult(searchResult){
    // messageクラスを削除
    $('.message').remove();
    // 検索結果が有った時
    if(searchResult[0].items){
      // 検索結果内のindex番号と値を取得
      $.each(searchResult[0].items,function(index, books){
        const status = '<li class="list-item"><div class="list-inner"><p>タイトル：' + ((books.title ? books.title : 'タイトル不明') + '</p><p>作者：') + ((books['dc:creator'] ? books['dc:creator'] : '作者不明') + '</p><p>出版社：' + ((books['dc:publisher'] ? books['dc:publisher'] : '出版社不明') + '</p><a href= "') + ((books.link['@id']) + 'target = "_blank">書籍情報</a></div></li>'));
        $('.lists').prepend(status);
      })
      // 検索結果が見つからなかった場合
    }else{
      $('.lists').before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>')
    }
  }
  // 通信エラー時の処理
  function displayError(errMessage){
    // .listsクラスの子要素を削除
    $('.lists').empty();
    // .messageクラスを削除
    $('.message').remove();
    // エラーメッセージのステータスの値が0の場合
    // リクエストが許可されていない場合のメッセージ
    if(errMessage.status === 0){
      $('.lists').before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>')
      // エラーメッセージが400と表示
      // 不正なリクエストとして処理された場合（文字入力が無い場合
      // や、URLなどが間違っている場合）に表示されるメッセージ
    }else if(errMessage.status === 400){
      $('.lists').before('<div class="message">検索キーワードが有効ではありません。<br>1文字以上で検索して下さい。</div>')
      // それ以外のエラー時のメッセージの表示
    }
    else{
      $('.lists').before('<div class="message">予期せぬエラーが発生しました。<br>再度接続し直してください。</div>')
    }
  }
  // リセットボタンを押下時
  $('.reset-btn').on('click', function(){
    // ページカウントを1に
    pageCount = 1;
    // continueSearchにsearchWordが代入されるようになっている事もあるため、元の値「""」を代入し元に戻す
    continueSearch = "";
    // .listsの子要素を削除
    $('.lists').empty();
    // .messageクラスを削除
    $('.message').remove();
    // 検索ワードを空にする
    $('#search-input').val("");
  })
})