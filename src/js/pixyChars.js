data = {
  a: ["ooooo", "oxxxo", "ooooo", "oxxxo", "oxxxo"],
  b: ["oooox", "oxxxo", "oooox", "oxxxo", "oooox"],
  c: ["ooooo", "oxxxx", "oxxxx", "oxxxx", "ooooo"],
  d: ["oooox", "oxxxo", "oxxxo", "oxxxo", "oooox"],
  e: ["ooooo", "oxxxx", "oooxx", "oxxxx", "ooooo"],
  f: ["ooooo", "oxxxx", "oooxx", "oxxxx", "oxxxx"],
  g: ["ooooo", "oxxxx", "oxxoo", "oxxxx", "ooooo"],
  h: ["oxxxo", "oxxxo", "ooooo", "oxxxo", "oxxxo"],
  i: ["o", "o", "o", "o", "o"],
  //TODO: review J
  j: ["xxo", "xxx", "xoo", "xxo", "xxo", "xxo", "oox"],
  k: ["oxxo", "oxox", "ooxx", "oxox", "oxxo"],
  l: ["oxxxx", "oxxxx", "oxxxx", "oxxxx", "ooooo"],
  m: ["oxxxo", "ooxoo", "oxoxo", "oxxxo", "oxxxo"],
  n: ["oxxxo", "ooxxo", "oxoxo", "oxxoo", "oxxxo"],
  o: ["ooooo", "oxxxo", "oxxxo", "oxxxo", "ooooo"],
  p: ["ooooo", "oxxxo", "ooooo", "oxxxx", "oxxxx"],
  q: ["xxxxx", "xxxxx,", "ooooo", "oxxxo", "ooooo", "xxxxo", "xxxxo"],
  r: ["oooox", "oxxxo", "oooox", "oxxox", "oxxxo"],
  s: ["ooooo", "oxxxx", "ooooo", "xxxxo", "ooooo"],
  t: ["ooooo", "xxoxx", "xxoxx", "xxoxx", "xxoxx"],
  u: ["oxxxo", "oxxxo", "oxxxo", "oxxxo", "ooooo"],
  v: ["oxxxo", "oxxxo", "oxxxo", "xoxox", "xxoxx"],
  w: ["oxxxo", "oxxxo", "oxxxo", "oxoxo", "xoxox"],
  x: ["oxxxo", "xoxox", "xxoxx", "xoxox", "oxxxo"],
  y: ["oxxxo", "oxxxo", "ooooo", "xxxxo", "ooooo"],
  z: ["ooooo", "xxxox", "xxoxx", "xoxxx", "ooooo"],
  space: ["xxx", "xxx", "xxx", "xxx", "xxx"],
  heart: ["xoxox", "oxoxo", "oxxxo", "xoxox", "xxoxx"],
};

let uniqueId = 1;

class PixyChars {
  constructor(params) {
    const { targetContainer, characters, options } = params;
    this.trgt = document.querySelector(targetContainer);
    this.chars = characters;
    // this.targetContainer = targetContainer;
    this.opts = {
      blocksDims: {
        width: "20px", // '.on' + '.off'
        height: "20px", // '.on' + '.off'
      },
      blocksGap: {
        horizontal: "0px", // '.on' + '.off'
        vertical: "0px", // '.on' + '.off'
      },
      gapBetweenChars: {
        horizontal: "20px", // '.char'
        vertical: "20px", // '.space'
      },
      blockBorderRadius: 0, // '.on' + '.off'
      colors: {
        blockBorderColor: "red",
        containerBackgroundColor: "inherit",
      },
      misc: {
        displayedCharsQuantity: 999,
        containerBorder: "0px",
        containerWrap: false, // same effect as text-wrap
        containerOverflow: false,
        verticalAlign: "center",
        animation: "slide",
        animationDuration: `${(Math.random() + 1) * 10}s`,
      },
    };
    if (!targetContainer) {
      throw Error(
        "Please define the class or id of the element where to inject the pixyChars"
      );
    }

    let { opts, chars, trgt } = this;

    if (options) {
      for (let option in options) {
        opts[option] = options[option];
      }
    }

    this.updateChars = (characters) => {
      this.trgt.innerHTML = "";
      this.createPixyChars(characters);
    };

    this.createPixyChars = function (characters) {
      if (characters) {
        chars = characters;
      }

      chars
        .slice(0, this.opts.misc.displayedCharsQuantity)
        .split("")
        .map((char) => {
          //TODO: check if char is between a-z || space otherwise it displays an error chars (span)
          //TODO: Update this if new

          let newChar = document.createElement("div");
          newChar.classList.add("char");
          //if character is a space
          if (char.charCodeAt() == 32) {
            char = "space";
          }
          if (char.charCodeAt() == 9829) {
            char = "heart";
          }
          data[char.toLowerCase()].map((charRow, id) => {
            let newCharRow = document.createElement("div");
            newCharRow.classList.add("char-row");
            newChar.append(newCharRow);
            charRow.split("").map((block) => {
              let blockClass;
              let newBlock = document.createElement("div");

              // determines the class of the block depending whether it is an empty block or not
              blockClass = block === "o" ? "on" : "off";
              newBlock.classList.add(blockClass, "block");
              if (newBlock.classList.contains("on")) {
                newBlock.style.borderColor = this.opts.colors.blockBorderColor;
              }
              newCharRow.appendChild(newBlock);
            });
          });
          trgt.appendChild(newChar);
        });
    };
    this.createPixyChars();
    if (this.opts.misc.animation !== "") {
      this.trgt.style.animationName = this.opts.misc.animation;
      this.trgt.style.animationDuration = this.opts.misc.animationDuration;
    }
  }
}
