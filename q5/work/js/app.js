$(function(){
  // メニューの項目の上にマウスホバーされた時に
  $('.dropdwn li').hover(function(){
    // メニューをスライドダウンで表示する
    $(this).children('ul').slideDown();
  },function(){
    // マウスが外れた際はメニューはスライドアップしメニューを閉じる。
    $(this).children('ul').slideUp();
  });
});