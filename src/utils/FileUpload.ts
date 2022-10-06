import * as Multer from 'multer';
const storageOptions =
    Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const fileFilter = (req:any, file:any, cb:any) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
    export class multer{
    public multer = Multer({storage: storageOptions, fileFilter: fileFilter});
}
  