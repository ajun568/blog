<template>
  <div>
    <section class="flex">
      <div class="flip mr20">
        <div class="front" style="background-image: url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb)">
          <h1 class="text-shadow card-title">服务器～连接世界的桥梁</h1>
        </div>
        <div class="back">
          <h2>服务器～连接世界的桥梁</h2>
          <p>酒好不怕巷子深，带着自己的作品尽情放飞自我吧。在这里，星星会说话，石头会开花，在这里，你就是夜空中最美的烟火。</p>
        </div>
      </div>
      <div class="flip">
        <div class="front" style="background-image: url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb)">
          <h1 class="text-shadow card-title">CSS～点缀你的美</h1>
        </div>
        <div class="back">
          <h2>CSS～点缀你的美</h2>
          <p>绿叶是鲜花的衬托，鲜花是绿叶的点缀。这里有繁茂的森林，亦有浩瀚的海洋。走进这里，你可以放开自我，只为抒写属于自己的美。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'articles-home'
}
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono");
* {
  box-sizing: border-box;
  font-weight: normal;
}
</style>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mr20 {
  margin-right: 20px !important;
}
.card-title {
  margin-top: 15px;
  text-align: center;
  font-size: 2.2em;
  border: none;
}
.flip {
  flex: 1;
  position: relative;
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin-right: 2px;
  margin-bottom: 1em;
  min-width: 350px;
  .front, .back {
    display: block;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 0.5s;
    transition-property: transform, opacity;

    display: block;
    color: white;
    width: inherit;
    background-size: cover !important;
    background-position: center !important;
    height: 220px;
    padding: 1em 2em;
    background: #313131;
    border-radius: 10px;
  }
  .front {
    transform: rotateY(0deg);
  }
  .back {
    position: absolute;
    opacity: 0;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg);
    h2 {
      text-align: center;
      font-size: 28px;
      line-height: 28px;
      margin: 20px 0 0;
      border: none;
    }
    p {
      color: #999;
      text-align: center;
      padding: 1em;
      line-height: 140%;
      border: none;
    }
  }
}
.flip:hover {
  .front {
    transform: rotateY(180deg);
  }
  .back {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
.flip.flip-vertical .back {
  transform: rotateX(-180deg);
}
.flip.flip-vertical:hover .front {
  transform: rotateX(180deg);
}
.flip.flip-vertical:hover .back {
  transform: rotateX(0deg);
}
.text-shadow {
  text-shadow: black 0.1em 0.1em 0.2em;
}

@media screen and (max-width: 768px) {
  .flex {
    flex-direction: column;
  }
  .flip.mr20 {
    margin-right: 0 !important;
  }
}
</style>
