<img src="https://i.postimg.cc/yYBp90yX/Tickitz-1.png" align="right" />

# TickEz - Booking Your Movie [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome#readme)
> Cara Mudah Booking Film

Applikasi Backend Yang Dibuat Menggunakan Node.js.


## :bookmark_tabs: Menu

- [Overview](#scroll-overview)
- [Documentation](#blue_book-documentation)
- [Requirements](#exclamation-requirements)
- [Installation and usage](#floppy_disk-installation-and-usage)
  - [Tests](#rotating_light-tests)
  - [Dependencies and libs](#heavy_check_mark-dependencies-and-libs)
  - [Folder Structure](#open_file_folder-folder-structure)
- [Release History](#gift-release-history)
- [License](#memo-license)
- [Author](#smiley_cat-author)

<!-- ## :scroll: Overview -->

<!-- Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut praesentium neque assumenda! Tempore culpa nihil laborum distinctio vel, illo quod veniam. Excepturi soluta beatae sed iusto sunt, impedit ducimus dignissimos?

## :rice_scene: Screenshot

![Logo](https://via.placeholder.com/750x500)

## :dvd: Demo

Lorem ipsum dolor sit amet consectetur, adipisicing elit.

| url                      | login          | password |
| ------------------------ | -------------- | -------- |
| http://exemplo.com/admin | admin@mail.com | 123      |
 -->
<!-- ## :blue_book: Documentation -->

<!-- Documentation lives at readthedocs.org -->

## :exclamation: Requirements

- [Node](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)

## :floppy_disk: Installation and usage

```
git clone https://github.com/<user>/<project>
```
```
Rename .ENV.COPY To .ENV & Setup Your Account
```
```
$ npm install
```
### :rotating_light: Tests

```
$ npm run dev
```

### :heavy_check_mark: Dependencies and libs

- [Multer](https://www.npmjs.com/package/multer)
- [REDIS](https://redis.io/)
- [JWT](https://jwt.io/)
- [MIDTRANS](https://midtrans.com/id)
### :open_file_folder: Folder Structure

```
.
├── node_modules            # Node Module
├── src                     # Project source code
    ├── config 
    ├── helpers
    ├── middleware
    ├── modules
    ├── routes
    ├── template
├── public                  # Asset public
├── .gitignore              # File Name For not uploaded on github
├── LICENSE                 # License This Project
└── README.md               # For Readme In github
```

## :gift: Release History

- 0.1.0
  - UploadImage       = Post with File, Update with File, File Validation (type & size)
  - NODEMAILLER       = Register
  - REDIS             = Schedule & Movie
  - AUTHENT           = REFRESH TOKEN
  - MIDTRANS          = - POST ke Midtarns
                        - Midtrans Notif
                        - Midtrans Di Helpers 
                        - SET DATA SUCCESS || CHANGE PAYMENT METHOD
   - Booking = PAYMENT GATEWAY 
   - Booking = Update Status When Payment Midtrans
- 0.0.1
  - Init the project


### :bell: Tasks

<details open>
<summary> Task list: </summary>

- [x] REDIS
- [x] Multer
- [x] JWT
- [x] Midtrans 
- [x] Node Mailler 
- [ ] Export PDF 

</details>

## :memo: License

The [MIT License]() (MIT)

## :smiley_cat: Author

- [@HariisV](https://github.com/HariisV)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=HariisV&show_icons=true&theme=radical)
