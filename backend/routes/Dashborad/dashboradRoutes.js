const router = require('express').Router();
const mongoose = require('mongoose');
const userModel = require('../../models/userModel');


const { category_add, category_get, category_delete, category_edit, category_update } = require('../../controller/Dashborad/categoryController');
const { tag_add, tag_get, tag_delete, tag_edit, tag_update } = require('../../controller/Dashborad/tagController');

const { get_tag_category, add_artical, get_artical, edit_artical, update_artical, delete_artical } = require('../../controller/Dashborad/articalController');

const { admin_middleware, auth_sub_admin } = require('../../middleware/authMiddleware');
const { get_dashboard_index_data, get_notification,seen_notification,delete_notification } = require('../../controller/Dashborad/indexController')

// category route
router.post('/add-category', admin_middleware, category_add);
router.get('/get-category', admin_middleware, category_get);
router.delete('/delete-category/:categoryId', admin_middleware, category_delete);
router.get('/edit-category/:categorySlug', admin_middleware, category_edit);
router.patch('/update-category/:categoryId', admin_middleware, category_update);

// tag route
router.post('/add-tag', admin_middleware, tag_add);
router.get('/get-tag', admin_middleware, tag_get);
router.delete('/delete-tag/:tagId', admin_middleware, tag_delete);
router.get('/edit-tag/:tagSlug', admin_middleware, tag_edit);
router.patch('/update-tag/:tagId', admin_middleware, tag_update);

//artical route............

router.get('/get-tag-category', admin_middleware, get_tag_category);
router.post('/add-artical', admin_middleware, add_artical);
router.get('/get-artical', admin_middleware, get_artical);
router.get('/edit-artical/:articleSlug', admin_middleware, edit_artical);
router.post('/update-artical', admin_middleware, update_artical);
router.delete('/delete-artical/:articleId', admin_middleware, delete_artical);


router.get('/get-dashboard-index-data', auth_sub_admin, get_dashboard_index_data)

router.get('/get-notification/:id', auth_sub_admin, get_notification);
router.get('/seen-notification/:id', auth_sub_admin, seen_notification) ;
router.get('/delete-notification/:id', auth_sub_admin, delete_notification)

// Route to get all sub-admins
router.get('/sub-admins', async (req, res) => {
    try {
      const subAdmins = await userModel.find({ role: 'sub admin' });
      res.status(200).json({ subAdmins });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/get-sub-admin-details/:subAdminEmail',async (req,res)=>{
  const {subAdminEmail}=req.params;
  try{
const subAdmin=await userModel.findOne({email:subAdminEmail});
if(!subAdmin){
  return res.status(404).json({error:'Sub-Admin not Found'});
}

res.status(200).json({
  name:subAdmin.userName,
  email:subAdmin.email,
  role:subAdmin.role,
  createdAt:subAdmin.createdAt,
  image:subAdmin.image,
})

  }
  catch(error){
    console.log(error);
    res.status(500).json({error:'Internal server error'});
  }
})


// router.put('/block-unblock-sub-admin/:subAdminId', async (req, res) => {
//   const { subAdminId } = req.params;
//   const { accessStatus } = req.body;

//   try {
//     // Assuming you have a User model
//     const subAdmin = await userModel.findById(mongoose.Types.ObjectId(subAdminId));

//     if (!subAdmin) {
//       return res.status(404).json({ error: 'Sub-admin not found' });
//     }

//     // Toggle the accessStatus
//     subAdmin.accessStatus = accessStatus === 'unblock' ? 'block' : 'unblock';

//     await subAdmin.save();

//     res.status(200).json({
//       message: `Access status of Sub-admin toggled successfully`,
//       accessStatus: subAdmin.accessStatus,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: 'Internal server error',
//     });
//   }
// });

router.put('/update-sub-admin-access/:subAdminId', async (req, res) => {
  const { subAdminId } = req.params;
  const { accessStatus } = req.body;
  try {
    // Find the sub-admin by ID and update the accessStatus
    await userModel.findByIdAndUpdate(subAdminId, { accessStatus });
    res.status(200).json({ message: 'Access status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;