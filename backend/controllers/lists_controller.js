const router = require("express").Router();
const db = require("../models");
const { List } = db;

router.get("/:id", (req, res) => {
    List.findOne({
        where: {list_id: `${req.params.id}`}
    })
        .then(list => {
            res.json(list);
        })
        .catch(() => {
            res.send("Error: Couldn't find this list.");
        });
        
});

router.get("/category/all", (req, res) => {
    List.findAll()
        .then(lists => {
            res.json(lists);
        })
        .catch(() => {
            res.send("Error: Couldn't find all lists.");
        })
});

router.get("/category/:id", (req, res) => {
    List.findAll({
        where: {category_id: `${req.params.id}`},
        order: [["list_id", "DESC"]]
    })
        .then(lists => {
            res.json(lists);
        })
        .catch(() => {
            res.send("Error: Couldn't find lists.");
        });
});

router.post("/", (req, res) => {
    List.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.send("Error: Couldn't post list.");
        });
});

router.put("/:id", (req, res) => {
    List.update(
        req.body,
        {where: {list_id: `${req.params.id}`}}
    )
        .then(num => {
            if(num == 1) {
                res.send(req.body);
            } else {
                res.send("Error: Couldn't update list.");
            }
        });
});

router.delete("/:id", (req, res) => {
    List.destroy({
        where: {list_id: `${req.params.id}`}
    })
        .then(num => {
            if(num == 1) {
                res.send("List has been successfully deleted.");
            } else {
                res.send("Error: Couldn't delete list.");
            }
        });
});


module.exports = router;