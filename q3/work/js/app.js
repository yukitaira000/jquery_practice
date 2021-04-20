$(function(){
// メニューをクリックした時に
  $('.drawer_button').on('click',function(){
    // .drawer_buttonにactiveクラスを追加しmenuをcloseに変更、ハンバーガーメニューを1つ目と3つ目のバーを使い×ボタンに変更。2つ目のバーは表示されないようにopacity:0;にしている。
    $(this).toggleClass('active');
    // 非表示にしていた.drawer_bgをフェードインさせる
    $('.drawer_bg').fadeToggle();
    // .drawer_nav_wrapperにopenクラスを追加して、メニューの内容を表示
    $('.drawer_nav_wrapper').toggleClass('open')});
    // .drawer_button activeがクリックされた時
  $('.drawer_button active, .drawer_bg').on('click',function(){
    // .drawer_bgをフェードアウトし非表示にする
    $('.drawer_bg').fadeOut();
    // .drawer_buttonにつけたactiveクラスを削除し、メニューボタンを初めのハンバーガーメニューに戻す
    $('.drawer_button').removeClass('active');
    //  .drawer_nav_wrapperにつけたopenクラスを削除しメニューの内容を非表示にする
    $('.drawer_nav_wrapper').removeClass('open')
  });
});

