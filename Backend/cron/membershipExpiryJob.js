const cron = require("node-cron");
const User = require("../models/User");
const Notification = require("../models/Notification");

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running Membership Expiry Check...");

  try {

    const now = new Date();

    const users = await User.find({
      "membership.isActive": true
    });

    for (const user of users) {

      const expiryDate = new Date(user.membership.expiryDate);

      const timeDiff = expiryDate - now;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      // ================= 3 DAY WARNING =================

      if (daysLeft === 3) {

        const existing = await Notification.findOne({
          user: user._id,
          type: "membership_warning"
        });

        if (!existing) {

          await Notification.create({
            user: user._id,
            message: `Your ${user.membership.plan} will expire in 3 days ⚠️`,
            type: "membership_warning",
            read: false
          });

          console.log(`⚠️ Expiry warning sent to ${user.name}`);

        }

      }

      // ================= EXPIRE MEMBERSHIP =================

      if (now >= expiryDate) {

        user.membership.isActive = false;

        await user.save();

        await Notification.create({
          user: user._id,
          message: `Your ${user.membership.plan} has expired ❌`,
          type: "membership_expired",
          read: false
        });

        console.log(`❌ Membership expired for ${user.name}`);

      }

    }

  } catch (err) {
    console.error("Membership expiry job error:", err);
  }

});