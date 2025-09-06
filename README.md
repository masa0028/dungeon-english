# TOEIC600 単語クイズ（10問ランダム・正解音ピンポン）

## ファイル構成
- `index.html` …… 単一ファイル（画像・音声ファイル不要／WebAudio使用）

## 公開（GitHub Pages）
1. GitHubで新規リポジトリを作成（Public）し、`index.html` を**ルート直下**にアップロード（Commit）。
2. **Settings → Pages** へ移動し、
   - Build and deployment: **Deploy from a branch**
   - Branch: `main` / **root**（`/`）を選択 → **Save**
3. 数十秒後、同ページに公開URLが出ます（例：`https://ユーザー名.github.io/リポジトリ名/`）。

## 更新
`index.html` を上書きCommitすれば自動で反映。

## メモ（スマホ）
- iOS/Androidともに動作。初回タップで音が鳴るようにAudioContextを作成しています。
- 文字サイズ・押しやすさは可変（clamp + 大きめボタン）。
