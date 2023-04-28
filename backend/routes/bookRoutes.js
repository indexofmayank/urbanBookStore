const express = require("express");
const router = express.Router();
const db = require("../db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const multer = require("multer");
const cloudinary = require("cloudinary");
const fs = require("fs");
const Errorhandler = require("../utils/errorhander");

cloudinary.config({
  cloud_name: "domrtfad0",
  api_key: "898734795917936",
  api_secret: "kdP_jgB-ksfQDjnIya1Uqr51jeQ",
});

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

//Route to get all books
router.get(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.cookies);
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Something went wrong"));
      }

      return res.json(data);
    });
  })
);

//Route to get bookById
router.get(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorHandler("Something went wrong while geting books")
        );
      }
      return res.json(data);
    });
  })
);

//Route to get book by searchTeam
router.get(
  `/search/:search_term`,
  catchAsyncErrors(async (req, res, next) => {
    const search_term = req.params.search_term;

    const q = "SELECT * FROM books WHERE `title` LIKE ?";
    db.query(q, [search_term + "%"], (err, data) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Something went Wrong while searching"));
      }
      return res.json({ data });
    });
  })
);

//Route to create book
router.post(
  `/`,
  uploadOptions.single("coverImage"),
  catchAsyncErrors(async (req, res, next) => {
    let coverImageUrl = "";
    //uploading image to server using multer
    
    //const localFilePath = req.file.path;
    //uploading image to cloudinary because of having issue mysql blob
    await cloudinary.uploader
      .upload(req.body.coverImage, {
        public_id: "urbanbook",
      })
      .then((data) => {
        coverImageUrl = data.secure_url;
        //Removing image file that was returned by multer
        //fs.unlinkSync(localFilePath);
      })
      .catch((err) => {
        console.log(err);
       //fs.unlinkSync(localFilePath);
      });

    const q =
      "INSERT INTO books(`title`, `description`, `coverImage`, `category` ) VALUES (?)";

    const Values = [
      req.body.title,
      req.body.description,
      coverImageUrl,
      req.body.category,
    ];

    db.query(q, [Values], (err, data) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Something went wrong"));
      }

      return res.json(data);
    });
  })
);

//Route to update book
router.put(
  `/update/:id`,
  uploadOptions.single("coverImage"),
  catchAsyncErrors(async (req, res, next) => {
    const bookId = req.params.id;
    let coverImageUrl = "";
    await cloudinary.uploader.upload(req.body.coverImage, {
      public_id: "urbanbook",
    }).then((data) => {
      coverImageUrl = data.secure_url;
    }).catch((err) => {
      console.log(err);
    });
    const q =
      "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `coverImage` = ?, `category` = ? WHERE id = ?";
    const Values = [
      req.body.title,
      req.body.description,
      req.body.price,
      coverImageUrl,
      req.body.category,
    ];

    db.query(q, [...Values, bookId], (err, data) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorHandler("Something went wrong while updating book")
        );
      }

      return res.json(data);
    });
  })
);

//Route to delete book
router.delete(
  `/delete/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorHandler("something went wrong while deleting Book")
        );
      }
      return res.json(data);
    });
  })
);

//Route to create Editons
router.post(
  `/editions/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const bookId = req.params.id;
    const q = "INSERT INTO editions(`year`, `price`, `book_id`) VALUES (?)";

    const Values = [req.body.year, req.body.price, bookId];
    db.query(q, [Values], (err, data) => {
      if (err) {
        console.log(err);
        return next(
          new Errorhandler("something went wrong while creating Editon")
        );
      }
      return res.json(data);
    });
  })
);

//Route to get Editions
router.get(
  `/editions/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM editions WHERE book_id = ?";
    let Editions = [];

    db.query(q, [bookId], (err, data) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Something went wrong getting Editions"));
      }
      return res.json(data);
    });
  })
  
);

//Route to update Editions
router.put(
  `/editions/update/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const editionsId = req.params.id;
    const q =
      "UPDATE editions SET `year` = ?, `price` = ?, `book_id` = ? WHERE id = ?";

    const Values = [req.body.year, req.body.price, req.body.book_id];

    db.query(q, [...Values, editionsId], (err, data) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorHandler("Something went wrong while updating editions")
        );
      }

      return res.json(data);
    });
  })
);

//Route to delete editions
router.delete(
  `/editions/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const editionsId = req.params.id;
    const q = "DELETE FROM editions WHERE id = ?";

    db.query(q, [editionsId], (err, data) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorHandler("Something went wrong while deleting edition")
        );
      }
      return res.json(data);
    });
  })
);

router.get(
  `/test`,
  catchAsyncErrors(async (req, res, next) => {
    res.json("Working inside bookRoutes");
  })
);
module.exports = router;
