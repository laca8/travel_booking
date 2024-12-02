const Club = require("../models/Club");
const addClub = async (req, res) => {
  const { name, club_owner, phone, manager, address, website } = req.body;
  // console.log(req.body);

  try {
    if (!name || !club_owner || !phone || !manager || !address) {
      return res.status(400).json({ message: "يجب ادخال جميع الحقول" });
    }
    const newClub = await Club.create({
      name,
      club_owner,
      phone,
      manager,
      address,
      website,
      userId: req.user._id,
    });
    return res.status(201).json({ data: newClub });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const getClub = async (req, res) => {
  try {
    const club = await Club.findOne({ userId: req.user._id });
    // if (!club) {
    //   return res.status(400).json({ message: "لم تقم باضافة نادي من قبل" });
    // }
    return res.status(201).json({ data: club });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const editClub = async (req, res) => {
  try {
    const clubExist = await Club.findOne({ userId: req.user._id });
    if (!clubExist) {
      return res.status(400).json({ message: "لم تقم باضافة نادي من قبل" });
    }
    const club = await Club.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(201).json({ data: club });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const deleteClub = async (req, res) => {
  try {
    const clubExist = await Club.findOne({ userId: req.user._id });
    if (!clubExist) {
      return res.status(400).json({ message: "لم تقم باضافة نادي من قبل" });
    }
    const club = await Club.findOneAndDelete({ userId: req.user._id });

    return res.status(201).json("تم حذف النادي");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = { addClub, getClub, editClub, deleteClub };
