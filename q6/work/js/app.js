$(function(){
  // セレクトボタンの値が変更された時
  $('.select-box').on('change', function(){
    // .select-boxの値を取得
    var a = $(this).val();
    // .food-list liに登録された値を取得
    var b = $('.food-list li');
    // 全てを選択している時、カテゴリーを全て表示する
    'all' === a ? b.show():
    // food-list liに関して
    $.each(b, function(c,d){
      // category-typeの値を取得する
      var e = $(d).data('category-type');
      // .select-boxの値と上記で取得したカテゴリーの値が同じものを表示する。異なるものは表示しない。
      a === e ? $(d).show(): $(d).hide()
    })
  })
})