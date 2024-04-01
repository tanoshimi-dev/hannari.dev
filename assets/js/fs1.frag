precision mediump float;
uniform sampler2D baseTexture;   // ベースカラーテクスチャ
uniform sampler2D heightTexture; // ハイトマップテクスチャ
uniform vec2      mouse;         // マウスカーソルの位置
uniform float     mouseScale;    // マウスカーソルの動きに対するスケール
uniform float     focus;         // フォーカスする深度
varying vec2      vTexCoord;

void main(){
    // まずハイトマップの色を取り出す
    vec4 heightColor = texture2D(heightTexture, vTexCoord);
    // ハイトマップは白黒なので、RGB どのチャンネルの色を使ってもよい
    // フォーカスする深度を変えると、影響を受ける高さが変化する
    float height = heightColor.r - focus;

    // マウスカーソルの位置の影響に、マウススケールとハイトスケールを乗算
    vec2 mouseVec = -mouse * mouseScale * height;

    // 最終的な色のサンプリング
    vec4 samplerColor = texture2D(baseTexture, vTexCoord + mouseVec);

    gl_FragColor = samplerColor;
}

