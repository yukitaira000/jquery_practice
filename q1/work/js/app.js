// 読み込んだ時に文字色を変更
$(function(){
  // cssで指定された文字色を#000に変更
  $('#q1').css('color', '#000');
});

// ボタンをクリックした時にボタンの色を変更
$(function(){
  // id名q2をクリックした時
  $('#q2').on('click', function(){
    // ボタンの色を変更
    $(this).css('background', 'pink');
  });
});

// ボタンをクリック後フェードアウト
$(function(){
  // ボタンをクリックしてから
  $('#q3').on('click', function(){
    // 3秒かけてフェードアウト
    $(this).fadeOut(3000);
  });
});

// ボタンをクリックした時にサイズ変更
$(function(){
  // ボタンをクリックした時に
  $('#q4').on('click', function(){
    // 幅を300pxにpaddingの上下を30pxに変更する
    $(this).addClass('large');
  });
});

// ボタンをクリック時にDOMを挿入
$(function(){
  // ボタンをクリック時に
  $('#q5').on('click', function(){
    // q5にDOM挿入という要素を追加
    $(this).after($(this)
    .before('DOMの前')
    .prepend('DOMの中の前')
    .append('DOMの中の後ろ')
    .after('DOMの後ろ'));
  });
});

//  ボタンをクリックして2秒かけて移動
$(function(){
  // ボタンをクリックした時に
  $('#q6').on('click', function(){
    // 2秒かけてmargin-top.margin-left:100pxの位置に移動
    $(this).animate({
      'margin-top': '100',
      'margin-left': '100'
    },
    // 2秒を表している
    2000
    );
  });
});

// ボタンをクリックした時にid名q7のノードをコンソールで表示
$(function(){
  // ボタンをクリックした時に
  $('#q7').on('click', function(){
    // id名q7のノードをコンソールで表示
    console.log(this);
  });
});

// ボタンホバー時にサイズ変更
$(function(){
  // ホバー時にサイズを大きめに変更
  $('#q8').on('mouseover', function(){
    // 変更後のサイズ指定
    $(this).addClass('large');
  });
  // ホバーしていない時は元のサイズに戻す指定
  $('#q8').on('mouseout', function(){
    // cssで設定されている値で表示する指定
    $(this).removeClass('large');
  });
});

// ボタンクリック時にアラート表示
$(function(){
  // リストのボタンがクリックされた時に
  $('#q9 li').on('click', function(){
    // thisを使用し押されたボタンのindex番号を取得
    const index = $(this).index();
    // 取得されたindex番号をアラートで表示
    alert(index);
  });
});

// q10のボタンをクリックした時にq11を操作
$(function(){
  // q10のボタンをクリックした時に
  $('#q10 li').on('click',function(){
    // クリックした要素を取得
    const index = $(this).index();
    // 取得した要素をコンソールに表示、index番号をeq(index)のindexに追加→q11 liのindex番号とq10 liのindex番号を結びつける
    console.log($('#q11 li').eq(index));
    //クリックされたq10の要素と結びついているq11のliにクラス名'large-text'を追加し、large-textに指定されたcssを適用させる。
    $('#q11 li').eq(index).addClass('large-text')
  });
});