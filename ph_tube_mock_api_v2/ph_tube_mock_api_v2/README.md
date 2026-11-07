# PH-Tube Mock API — Version 2

Local Express mock API with PH-Tube-style routes and response envelopes. Includes 22 sample videos, 5 categories, author data, descriptions, title search, category filtering, video details, and numeric view-count sorting.

## Run in Windows PowerShell

Open PowerShell in this folder and run:

```powershell
npm install
npm start
```

Keep the terminal running. Base URL: `http://localhost:5000/api/phero-tube`

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/categories` | Get categories |
| GET | `/videos` | Get all videos |
| GET | `/category/1006` | Get videos in a category |
| GET | `/videos?title=javascript` | Search titles |
| GET | `/videos?category_id=1006` | Filter videos by category |
| GET | `/video/vid001` | Get one video's details |
| GET | `/videos?sort=views&order=desc` | Sort by views, highest first |
| GET | `/videos?sort=views&order=asc` | Sort by views, lowest first |

Try these complete URLs:

- http://localhost:5000/api/phero-tube/categories
- http://localhost:5000/api/phero-tube/videos
- http://localhost:5000/api/phero-tube/category/1006
- http://localhost:5000/api/phero-tube/videos?title=javascript
- http://localhost:5000/api/phero-tube/video/vid001
- http://localhost:5000/api/phero-tube/videos?sort=views&order=desc

## Response format

Success:

```json
{"status":true,"message":"successfully fetched videos","data":[]}
```

Error:

```json
{"status":false,"message":"Video not found","data":null}
```

Video objects use the common PH-Tube fields: `category_id`, `video_id`, `thumbnail`, `title`, `authors`, and `others`. This mock also adds `description` for the details view. Author objects contain `profile_picture`, `name`, and `verified`; `others` contains `views` and `posted_date`.

## Compatibility note

This is a local mock dataset, not the official Programming Hero API. It follows the commonly used PH-Tube endpoint and object pattern, but course revisions may differ. If your 2025 starter code expects any additional exact field or a different response message, compare it with that code and adjust the mock accordingly.
