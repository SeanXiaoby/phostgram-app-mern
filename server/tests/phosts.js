const db = require("../models/db");

(async () => {
  await db.connectDB();
  console.log(
    // await db.insertPhost({
    //   author_id: "6451b12bea1b101f991eb716",
    //   img: null,
    //   text: "third text phost",
    // })

    // await db.getPhost("6451e4d7160b58656bcd76e5")

    await db.getAllPhosts()
  );
})();
