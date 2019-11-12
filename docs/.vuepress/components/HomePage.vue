<template>
	<div>
		<div class="bg">
			<ul class="bubble">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<section class="container">
				<section class="avatar">
					<img src="../public/image/avatar.jpg" alt="avatar">
				</section>
				<section class="top">
					<li class="name">{{ data.head }}</li>
				</section>
				<section class="bottom">
					<ul class="content">
						<li v-for="item in data.content">
							{{ item }}
						</li>
					</ul>
					<div class="desc">
						{{ data.interests }}
					</div>
					<ul class="link">
						<li v-for="item in data.socials">
							<a :href="item.link" target="_blank">
								<img class="link-svgs" :src="item.icon || '/image/' + item.title + '.svg'" :alt="item.title" :title="item.title">
							</a>
						</li>
					</ul>
				</section>
			</section>
			<section class="button ice enter" @click="toBlog">Enter</section>
			<section class="footer">{{ data.footer }}</section>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
    data() {
      return {
        ...this.$page.frontmatter
      }
    }
	},
	created() {
		// 禁用右键及选择
		this.$nextTick(() => {
			// document.oncontextmenu = new Function("event.returnValue=false")
			// document.onselectstart = new Function("event.returnValue=false")
		})
	},
	methods: {
		toBlog() {
			this.$router.push('articles')
		}
	}
}
</script>

<style lang="less" scoped>
	* {
		text-align: center;
	}

	.bg {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(to bottom right, #066ABD 0%, #0B1644 100%);

		li {
			list-style: none;
		}

	  .bubble {
			width: 100vw;
			height: 100vh;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			overflow: hidden;

	  	li {
	  		position: absolute;
	  		bottom: -160px;
	  		width: 40px;
	  		height: 40px;
	  		background-color: fade(White, 15%);

	  		display: block;
	  		animation: bubble 20s infinite;
	  		animation-timing-function: linear;

	  		&:nth-child(1) {
					left: 10%;
	  		}

	  		&:nth-child(2) {
					left: 20%;
					width: 80px;
					height: 80px;
					animation-duration: 12s;
					animation-delay: 2s;
	  		}

	  		&:nth-child(3) {
					left: 25%;
					animation-delay: 4s;
	  		}

	  		&:nth-child(4) {
	  			left: 27%;
	  			width: 10px;
	  			height: 10px;
	  			background-color: fade(White, 30%);
	  			animation-duration: 35s;
	  			animation-delay: 2s;
	  		}

	  		&:nth-child(5) {
					left: 32%;
					width: 160px;
					height: 160px;
					animation-delay: 7s;
	  		}

	  		&:nth-child(6) {
					left: 40%;
	  			width: 60px;
	  			height: 60px;
					background-color: fade(White, 25%);
					animation-duration: 22s;
	  		}

	  		&:nth-child(7) {
					left: 55%;
					width: 20px;
					height: 20px;
					animation-duration: 35s;
					animation-delay: 2s;
	  		}

	  		&:nth-child(8) {
					left: 70%;
	  		}

	  		&:nth-child(9) {
					left: 80%;
					width: 120px;
					height: 120px;
					background-color: fade(White, 20%);
					animation-delay: 3s;
	  		}

	  		&:nth-child(10) {
					left: 90%;
					width: 160px;
					height: 160px;
					animation-delay: 11s;
	  		}
	  	}
	  }

	}

	.container {
		position: relative;
		z-index: 2;
		max-width: 600px;
		height: 350px;
    margin: 150px auto 0;
		background-color: rgba(168, 236, 255, .7);
		border-radius: 8px;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
		.avatar {
			position: absolute;
			top: calc(-176px / 2);
			left: calc(50% - (176px / 2));
			width: 156px;
			height: 156px;
			overflow: hidden;
			border-radius: 50%;
			border: 10px solid rgba(29, 96, 240, 0.5);
			img {
				height: 100%;
			}
		}
		.top {
			padding-top: calc((156px + 20px) / 2);
			.name {
        margin: 10px 0px;
        font-weight: 700;
        font-size: 2.3em;
        background-image: -webkit-linear-gradient(left, #111, #999 25%, #444 60%, #c1c1c1 75%, #333);
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-background-size: 200% 100%;
        background-size: 200% 100%;
        -webkit-animation: masked-animation 2.3s infinite linear .9s alternate;
        animation: masked-animation 2.3s infinite linear .9s alternate;
      }
		}
		.bottom {
			.content {
				display: flex;
				justify-content: center;
				padding-top: 20px;
				padding-bottom: 20px;
				border-bottom: 1px solid rgba(168, 236, 255, 1);
				li {
					font-size: 20px;
					line-height: 20px;
					padding: 0 10px;
					border-left: 1px solid #333;
				}
				li:first-child {
					border-left-width: 0;
				}
			}
			.desc {
				font-size: 20px;
				line-height: 20px;
				color: #555;
				padding: 20px 0;
				border-bottom: 1px solid rgba(168, 236, 255, 1);
			}
			.link {
				display: flex;
				flex-direction: row;
				justify-content: center;
				user-select: none;
				li {
					z-index: 9;
				}
				.link-svgs, img {
					width: 32px;
					margin: 1em;
					border-radius: 3px;
					cursor: pointer;
				}
			}
		}
	}
	.container::before,
	.container::after {
		animation: pulse 2s linear infinite;
		border: #fff solid 8px;
		border-radius: 9999px;
		box-sizing: border-box;
		content: ' ';
		height: 140%;
		left: -20%;
		opacity: .6;
		position: absolute;
		top: -20%;
		transform: scale(0.714);
		width: 140%;
		z-index: 1;
	}
	.container::after {
		animation-delay: 1s;
	}

	.enter {
		z-index: 9;
		cursor: pointer;
		margin: 80px auto 0;
		user-select: none;
	}
	.button {
		border: 1px solid green;
		-webkit-backdrop-filter: blur(10px);
						backdrop-filter: blur(10px);
		-webkit-transform: skewX(-10deg);
						transform: skewX(-10deg);
		height: 50px;
		width: 200px;
		border-radius: 20px 5px 20px 0px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		font: 15px sans-serif;
		font-weight: 300;
		text-shadow: 0 0 20px #fff;
		text-transform: uppercase;
		-webkit-animation: breath2 2s 0.5s infinite alternate;
						animation: breath2 2s 0.5s infinite alternate;
		transition: all 0.2s ease;
		cursor: pointer;
	}
	.button:before {
		content: "";
		display: block;
		width: calc(100% - 22px);
		height: calc(50px - 8px);
		-webkit-animation: breath 2s infinite alternate;
						animation: breath 2s infinite alternate;
		left: 10px;
		top: 3px;
		position: absolute;
		background-color: transparent;
		border: 1px solid #fff;
		border-radius: 15px 3px 15px 3px;
	}
	.button.fire {
		border-color: #ffeca8;
		background-image: linear-gradient(to bottom, rgba(255, 138, 48, 0.6), rgba(240, 96, 29, 0.6));
		box-shadow: 0 0 70px rgba(255, 138, 48, 0.6), 0 5px 20px rgba(255, 138, 48, 0.6), inset 0 1px #ffeca8, inset 0 -1px #ffeca8;
		color: #ffeca8;
	}
	.button.fire:before {
		box-shadow: inset 0 0 30px 0 #ffeca8;
	}
	.button.ice {
		border-color: #a8ecff;
		background-image: linear-gradient(to bottom, rgba(48, 138, 255, 0.5), rgba(29, 96, 240, 0.5));
		box-shadow: 0 0 70px rgba(48, 138, 255, 0.5), 0 5px 20px rgba(48, 138, 255, 0.5), inset 0 1px #ffeca8, inset 0 -1px #ffeca8;
		color: #a8ecff;
	}
	.button.ice:before {
		box-shadow: inset 0 0 30px 0 #a8ecff;
	}
	.button:hover.fire {
		box-shadow: 0 0 70px rgba(255, 138, 48, 0.8), 0 5px 20px rgba(255, 138, 48, 0.8), inset 0 1px #ffeca8, inset 0 -1px #ffeca8;
	}
	.button:hover.fire:before {
		box-shadow: inset 0 0 50px 0 #ffeca8;
	}
	.button:hover.ice {
		box-shadow: 0 0 70px rgba(48, 138, 255, 0.8), 0 5px 20px rgba(48, 138, 255, 0.8), inset 0 1px #a8ecff, inset 0 -1px #a8ecff;
	}
	.button:hover.ice:before {
		box-shadow: inset 0 0 50px 0 #a8ecff;
	}
	.button + .button {
		margin-top: 15px;
		-webkit-animation-delay: 0.3s;
						animation-delay: 0.3s;
	}

	@-webkit-keyframes breath {
		0% {
			-webkit-transform: scaleX(1);
							transform: scaleX(1);
		}
		100% {
			-webkit-transform: scaleX(0.95);
							transform: scaleX(0.95);
		}
	}

	@keyframes breath {
		0% {
			-webkit-transform: scaleX(1);
							transform: scaleX(1);
		}
		100% {
			-webkit-transform: scaleX(0.95);
							transform: scaleX(0.95);
		}
	}
	@-webkit-keyframes breath2 {
		0% {
			-webkit-transform: skewX(-10deg) scaleX(1);
							transform: skewX(-10deg) scaleX(1);
		}
		100% {
			-webkit-transform: skewX(-10deg) scaleX(0.95);
							transform: skewX(-10deg) scaleX(0.95);
		}
	}
	@keyframes breath2 {
		0% {
			-webkit-transform: skewX(-10deg) scaleX(1);
							transform: skewX(-10deg) scaleX(1);
		}
		100% {
			-webkit-transform: skewX(-10deg) scaleX(0.95);
							transform: skewX(-10deg) scaleX(0.95);
		}
	}
	.ref {
		-webkit-backdrop-filter: blur(10px);
						backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 3px;
		padding: 5px 8px;
		position: absolute;
		font-size: 16px;
		bottom: 10px;
		right: 10px;
		color: #fff;
		font-weight: 300;
		font-family: sans-serif;
		text-decoration: none;
	}
	.ref::first-letter {
		font-size: 12px;
	}


	.footer {
		position: absolute;
		bottom: 30px;
		left: 0;
		display: inline-block;
		width: 100vw;
    border: none;
    font-size: 1rem;
    text-align: center;
    color: #aaa;
  }

	@keyframes bubble {
		0% {
			transform: translateY(0);
		}
		100% {
			bottom: 100%;
			transform: translateY(-700px) rotate(600deg);
		}
	}

	@keyframes pulse {
		to {
			opacity: 0;
			transform: scale(1);
		}
	}
	@keyframes masked-animation {
		from {
			background-position: 0 0
		}
		to {
			background-position: -100% 0
		}
	}
</style>
