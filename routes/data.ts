import express from "express";
import Data from "../models/data";
import user from "../models/user";
import { UserInfo } from "os";

const router: express.Router = express.Router();

router.get("/ids", async (req: express.Request, res: express.Response) => {
  const ids = req.body.ids;
  const email = req.body.ids;
  const emailid = req.body.emailid;

  try {
    let u: any = await user.find({ email: emailid });
    u = u[0];
    let data: any = [];

    data = await Data.find({ FBID: { $in: ids } })
    if (u.balance > data.length) {
      await user.updateOne({ email: emailid }, { $inc: { balance: -(data.length) } });

    } else {
      await user.updateOne({ email: emailid }, { $inc: { balance: 0 } });

    }
    console.log(data.length)
    console.log(u.balance)



    // { $inc: { balance: -(data.length) }
    if (data.length != 0) return res.status(200).json({ data: data, blance: (u.balance > data.length) ? (u.balance - data.length) : 0 })
    res.status(404).json({ users: 'no users' })
    return res.status(200).json({ message: "no data" })

  } catch (e) {
    res.status(500).json({ error: e })
  }
});

router.get("/search", async (req: express.Request, res: express.Response) => {


  const { FBID, Phone, first_name, last_name, email, birthday, gender, locale, hometown, location, country } = req.body;
  let limit = req.body.limit;
  let emailid = req.body.emailid;




  interface Filter {
    FBID?: string;
    Phone?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    birthday?: string;
    gender?: string;
    locale?: string;
    hometown?: string;
    location?: string;
    country?: string;
  }

  const filter: Filter = {};
  try {


    if (FBID) {
      filter.FBID = FBID;
    }

    if (Phone) {
      filter.Phone = Phone;
    }

    if (first_name) {
      filter.first_name = first_name;
    }

    if (last_name) {
      filter.last_name = last_name;
    }

    if (email) {
      filter.email = email;
    }

    if (birthday) {
      filter.birthday = birthday;
    }

    if (gender) {
      filter.gender = gender;
    }

    if (locale) {
      filter.locale = locale;
    }

    if (hometown) {
      filter.hometown = hometown;
    }

    if (location) {
      filter.location = location;
    }

    if (country) {
      filter.country = country;
    }
    let u: any = await user.find({ email: emailid });
    u = u[0];
    console.log(u);
    let data: any = [];
    if (u.balance < limit) {
      limit = u.balance;
    }
    const updateUser: any = [];
    data = await Data.find(filter).limit(limit);
    if (u.balance > data.length) {
      await user.updateOne({ email: emailid }, { $inc: { balance: -(data.length) } });

    } else {
      await user.updateOne({ email: emailid }, { $inc: { balance: 0 } });

    }
    console.log(data.length)
    console.log(u.balance)



    // { $inc: { balance: -(data.length) }
    if (data.length != 0) return res.status(200).json({ data: data, blance: (u.balance > data.length) ? (u.balance - data.length) : 0 })
    res.status(404).json({ users: 'no users' })
  } catch (e) {
    return res.status(500).json({ error: e })

  }


});
export default router;
