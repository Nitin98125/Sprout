import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Confession from "./confessions";
import axios from "axios";

const StudentList = [
  { name: "Institution" },
  { name: "Express" },
  { name: "Feelings" },
];

const Confess = () => {
  const [alignment, setAlignment] = useState("Feelings");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [confession, setConfession] = useState("");
  const [confessionList, setConfessionList] = useState([]);
  const [valueTags, setValueTags] = useState([]);

  const handleConfess = (event) => {
    setConfession(event.target.value);
  };

  const handlePost = async () => {
    if(confession===""){
      alert("Confession Can't Be EMPTY");
      return;
    }
    try {
      const data = {
        text: confession,
        confession_no: confessionList.length + 1,
        genre: alignment,
        emojis: 0,
      };
      await axios.post("/confess", data);
      setConfessionList([...confessionList, data]);
      setConfession("");
      console.log("POSTED");
    } catch {
      console.log("Unable To POST");
    }
  };

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get("/confessionList");
      setConfessionList(res.data);
    };
    getdata();
  }, []);

  function func(genre) {
    let c = valueTags.length ? 0 : 1;
    valueTags.forEach((element) => {
      if (element.name === genre) {
        c = 1;
      }
    });
    return c;
  }

  const handletags = async (event, value) => {
    setValueTags(value);
  };

  const handleSelect = async (emoji_id, confess_id, countrec) => {
    let List = confessionList;
    List[confess_id - 1].emojis = countrec;
    setConfessionList(List);
    const data = {
      emoji_id: emoji_id,
      confess_id: confess_id,
      totalrec: countrec,
    };
    await axios.post("/UpdateEmojis", data);
  };

  return (
    <div className="confession">
      <div className="fixed w-[100%] bg-white z-10">
        <Navbar />
        <div className="confesswritten my-8 text-center w-[80%] mx-auto">
          <TextareaAutosize
            maxRows={2}
            aria-label="maximum height"
            placeholder="Write Confession here ..."
            onChange={handleConfess}
            value={confession}
            style={{
              width: "100%",
              border: "1px solid grey",
              padding: "10px",
              maxHeight: "60px",
            }}
          />
          <div className="mx-auto text-left">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="Feelings">Feelings</ToggleButton>
              <ToggleButton value="Institution">Institution</ToggleButton>
              <ToggleButton value="Express">Express</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="my-8 text-center">
            <Button variant="contained" onClick={handlePost}>
              POST
            </Button>
          </div>
        </div>
        <div className="border-2 w-[90%] mx-auto py-8 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg">
          <Autocomplete
            sx={{ width: "90%", margin: "auto",backgroundColor:"white" }}
            multiple
            id="tags-outlined"
            options={StudentList}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            onChange={handletags}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search By Tags"
                placeholder="Search By Tags"
              />
            )}
          />
        </div>
      </div>
      <div className="py-2 mx-[5%] w-[90%] absolute my-[400px]">
        {confessionList
          .filter((ele) => {
            return func(ele.genre);
          })
          .map((data, index) => (
            <Confession
              id={data.confession_no}
              key={index}
              text={data.text}
              genre={data.genre}
              emojis={data.emojis}
              onSelect={handleSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default Confess;
