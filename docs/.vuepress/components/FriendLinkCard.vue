<template>
  <div>
    <div class="friend-card">
      <div class="meta">
        <div class="photo" :style="`background-image: url(${$withBase('/image/friend_link_2.jpg')})`"></div>
        <ul class="details">
          <li class="name"><a href="https://delpast.com" target="_blank">Delpast</a></li>
          <li>无来处</li>
          <li class="tags">
            <ul>
              <li style="margin-right: 5px;"><a href="https://delpast.com/channel/CHANEL_266da2f23f984f5dbefe44bd55b3aae3" target="_blank">博客</a></li>
              <li><a href="https://delpast.com/channel/CHANEL_4848a272a1614a428d64712f20d41fab" target="_blank">技术杂谈</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="description">
        <h1>Delpast（无来处）</h1>
        <h2>Opening a door to the future</h2>
        <p>本站是一个博客网站，主要用于博文记录，包括编程相关的技术知识和问题记录，或者分享一些个人故事心得。眼前的黑不是黑，你说的白是什么白。</p>
        <p class="read-more">
          <a href="https://delpast.com" target="_blank">Enter</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'friend-link-card'
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>

<style lang="less" scoped>
.friend-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.6%;
  background: #fff;
  line-height: 1.4;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;

  // 初始化
  a {
    color: inherit;
  }
  a:hover {
    color: #74b1a8;
  }

  // 样式
  .meta {
    position: relative;
    z-index: 0;
    height: 200px;
  }
  .photo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    transition: transform .2s;
  }
  .details,
  .details ul {
    margin: auto;
    padding: 0;
    list-style: none;
  }
  .details {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    margin: auto;
    -webkit-transition: left .2s;
    transition: left .2s;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 10px;
    width: 100%;
    font-size: .9rem;
    .name {
      font-size: 24px;
    }
    a {
      text-decoration: dotted underline;
    }
    ul li {
      display: inline-block;
    }
    .tags li {
      margin-right: 2px;
    }
  }
  .description {
    padding: 1rem;
    background: #fff;
    position: relative;
    z-index: 1;
    h1 {
      line-height: 1;
      margin: 0;
      font-size: 1.7rem;
    }
    h2 {
      font-size: 1rem;
      font-weight: 300;
      text-transform: uppercase;
      color: #a2a2a2;
      margin-top: 5px;
      border-bottom: none;
    }
      .read-more {
      text-align: right;
    }
    .read-more a {
      color: #74b1a8;
      display: inline-block;
      position: relative;
      transition: all .5s ease;
    }
    .read-more a:hover {
      opacity: .7;
      transition: all .5s ease;
    }
  }
  p:first-of-type {
    margin-top: 1.25rem;
  }
}
.friend-card:hover {
  .photo {
    transform: scale(1.3) rotate(3deg);
  }
  .details {
    left: 0%;
  }
}
@media (min-width: 640px) {
  .friend-card {
    flex-direction: row;
    max-width: 700px;
    .meta {
      flex-basis: 40%;
      height: auto;
    }
    .description {
      flex-basis: 60%;
    }
  }
}
</style>