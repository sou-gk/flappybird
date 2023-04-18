// 上のかべの変数
let upperWall_x1;
let upperWall_y1;
let upperWall_speed;
let upperWall_width;
let upperWall_height;

// 下のかべの変数
let lowerWall_x1;
let lowerWall_y1;
let lowerWall_speed;
let lowerWall_width;
let lowerWall_height;

// プレイヤーの変数
let player_x1;
let player_y1;
let player_width;
let player_height;
let player_jumpSpeed;

// 背景の色の変数
let bg_r;
let bg_g;
let bg_b;

// ゲーム中で使用する変数
let gravity;
let key_press;
let game_status;

// ゲームスタート時に実行される関数(Scratchの緑の旗が押されたらと同じ)
function setup() {
  //キャンバス初期化処理(背景のサイズを指定する)
  createCanvas(400, 400);

  //背景色設定(RGBで指定する)
  bg_r = 144;
  bg_g = 215;
  bg_b = 236;
  //背景描画
  background(bg_r, bg_g, bg_b);

  //フレームレート設定(60fps)
  frameRate(60);

  //その他、ゲーム中で使用する変数の初期化
  gravity = 2;
  key_press = false;
  game_status = "play";

  //かべの初期化
  wallInit();

  //プレイヤー変数の初期化
  player_x1 = 50;
  player_y1 = height / 2;
  player_width = 25;
  player_height = 25;
  player_jumpSpeed = 4;
}

// ゲーム中ずっと実行される関数(Scratchの「ずっと」ブロックと同じ)
function draw() {
  //-----計算処理 ここから-----

  // ゲームオーバー処理
  if (game_status == "game over") {
    // ゲームオーバー文字設定
    textSize(30);
    textAlign(CENTER, CENTER);
    fill("black");
    strokeWeight(5);
    stroke("red");
    // ゲームオーバー文字表示
    text("Game Over", width / 2, height / 2);
    // ゲームを終了する
    return;
  }

  // スピードアップ 5秒ごとに
  if (frameCount % 300 == 0) {
    upperWall_speed += 0.25;
    lowerWall_speed += 0.25;
  }

  // 端まで行ったらストップ
  if (upperWall_x1 < 0 && lowerWall_x1 < 0) {
    //壁を初期位置に
    wallSpawn();
  }

  // 壁を移動させる
  upperWall_x1 = wallMove(upperWall_x1, upperWall_speed);
  lowerWall_x1 = wallMove(lowerWall_x1, lowerWall_speed);

  // 操作判定(スペースが押されたら飛ぶ)
  if (key_press) {
    player_y1 -= player_jumpSpeed;
  }

  // 地面まで重力で落ちる
  if (player_y1 < height - player_height) {
    player_y1 += gravity;
  }

  // 当たり判定
  let hit_check1 = false;
  let hit_check2 = false;
  hit_check1 = wallHit(
    upperWall_x1,
    upperWall_y1,
    upperWall_width,
    upperWall_height
  );
  hit_check2 = wallHit(
    lowerWall_x1,
    lowerWall_y1,
    lowerWall_width,
    lowerWall_height
  );
  // 上下どちらかのかべに当たっていたらゲームステータスをゲームオーバーにする;
  if (hit_check1 || hit_check2) {
    game_status = "game over";
  }

  //-----計算処理 ここまで-----

  //-----描画処理 ここから-----

  // 背景描画
  background(bg_r, bg_g, bg_b);

  // プレイヤー描画
  rect(player_x1, player_y1, player_width, player_height);

  // かべ描画
  rect(upperWall_x1, upperWall_y1, upperWall_width, upperWall_height);
  rect(lowerWall_x1, lowerWall_y1, lowerWall_width, lowerWall_height);

  //-----描画処理 ここまで-----
}

// かべに当たったかどうか判定する関数
function wallHit(w_x1, w_y1, w_w, w_h) {
  if (
    player_x1 < w_x1 + w_w &&
    w_x1 < player_x1 + player_width &&
    player_y1 < w_y1 + w_h &&
    w_y1 < player_y1 + player_height
  ) {
    return true;
  }
}

// かべの初期化
function wallInit() {
  // 上側のかべ
  upperWall_speed = 1;
  upperWall_width = 50;

  // 下側のかべ
  lowerWall_speed = 1;
  lowerWall_width = 50;

  // かべを生成する
  wallSpawn();
}

// かべを生成する
function wallSpawn() {
  // 上側の壁
  upperWall_x1 = width;
  upperWall_y1 = 0;
  upperWall_height = getRandomInt(25, height - 100);

  // 下側の壁
  lowerWall_x1 = width;
  lowerWall_height = getRandomInt(25, height - upperWall_height - 50);
  lowerWall_y1 = height - lowerWall_height;
}

// かべの移動
function wallMove(x, speed) {
  return x - speed;
}

// キーイベント(キーが押されたら)
function keyPressed() {
  switch (key) {
    case " ":
      key_press = true;
      break;
  }

  return false;
}

// キーイベント(キーが離されたら)
function keyReleased() {
  key_press = false;
  return false;
}

// 乱数生成(整数)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}