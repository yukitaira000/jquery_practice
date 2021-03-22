$(function(){
  // アカウント作成ボタンをクリックした時コンソールに下記を表示する処理
  $('.btn__submit').on('click', function(){
    console.log('名字');
    // 名字の項目に入力した情報を取得し、コンソールに表示
    console.log($('#family__name').val());

    console.log('名前');
    // 名前の項目に入力した情報を取得し、コンソールに表示
    console.log($('#given__name').val());

    console.log('生年月日');
    // 年、月、日で選択された値をそれぞれ取得し、合わせた
    // 表記でコンソールに表示
    console.log($('.year').val() + '年' + $('.month').val() + '月' + $('.day').val() + '日');

    console.log('性別');
    // 性別の項目で選択された値を取得するために:checkedを使用し値を取得、選択された値をコンソールに表示
    console.log($('[name = gender]:checked').val());

    console.log('職業');
    // 職業の項目で選択された値を取得しコンソール表示
    console.log($('.occupation').val());

    console.log('アカウント名');
    // アカウント名に入力された値を取得しコンソールに表示
    console.log($('#account__name').val());

    console.log('メールアドレス');
    // メールアドレスに入力された値を取得しコンソールに表示
    console.log($('#email').val());

    console.log('パスワード');
    // パスワードに入力された値を取得しコンソールに表示
    console.log($('#password').val());

    console.log('確認用パスワード');
    // 確認パスワード項目に入力された値を取得しコンソールに表示
    console.log($('#duplication__password').val());

    console.log('住所');
    // 住所の項目に入力された値を取得しコンソールに表示
    console.log($('#address').val());

    console.log('電話番号');
    // 電話番号項目に入力された値を取得しコンソールに表示
    console.log($('#tel').val());

    console.log('購読情報');
    // 複数の項目を選択した場合も値が取得できるように、.each()を使用し値を取得しコンソールに表示
    ($('[name="subscription"]:checked').each(function(){
      console.log($(this).val())
    })
    );
  });
});