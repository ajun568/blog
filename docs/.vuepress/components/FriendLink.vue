<template>
  <div class="friend-link">
    <a target="_blank" href="https://blog.weekii.cn">
      <section class="friend-container">
        <div class="image-container">
          <img :src="`${$withBase('/image/zhifeng.jpg')}`" alt="Roki's Blog">
        </div>
        <div class="name">Roki</div>
        <div class="desc">Roki's Blog ～ https://blog.weekii.cn</div>
      </section>
    </a>
    <a target="_blank" href="http://www.lionad.art">
      <section class="friend-container mt20">
        <div class="image-container">
          <img :src="`${$withBase('/image/yunshu.gif')}`" alt="Roki's Blog">
        </div>
        <div class="name">Lionad</div>
        <div class="desc">Lionad-Guirotar ～ http://www.lionad.art</div>
      </section>
    </a>
  </div>
</template>

<script>
export default {
  name: 'friend-link'
}
</script>

<style lang="less" scoped>
  .friend-container.mt20 {
    margin-top: 20px;
  }
  .friend-link {
    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: none;
    }
    a:active {
      text-decoration: none;
    }
  }
  .friend-container {
    margin: 0 auto;
    width: 100%;
    max-width: 700px;
    height: 60px;
    border: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    transition: all .5s ease;
    .image-container {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 20px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .name {
      font-size: 24px;
      font-weight: bold;
      color: #74b1a8;
    }
    .desc {
      flex: 1;
      text-align: right;
      color: #a2a2a2;
      font-size: 14px;
    }
  }
  .friend-container:hover {
    box-shadow: 0 0 10px #74b1a8;
    border-color: #74b1a8;
    transition: all .5s ease;
    .desc {
      color: #74b1a8;
    }
  }
</style>