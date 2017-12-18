<template lang='jade'>
.game-container.row
	.congrats-title.fs-bold.center-xs.col-xs-12(v-if = "gameStatus == 'Game Completed'") Congratulations, You have Won!!!
	mine-sweeper-board(:game = 'gameData' @update = "updateGame")
	.row.col-xs-12.center-xs
		.col-xs-12.col-md-3
			span.fs-bold Time
			{{formatedTime}}
		.col-xs-12.col-md-3
			span.fs-bold Game Status
			{{gameStatus}}
		.col-xs-12.col-md-3.text-center.my-account-link
			span(@click='backToProfile()') < Back
		.col-xs-12.col-md-3.center-xs.start-md
			button(@click='logOut()') Log out
</template>

<script>
import MineSweeperBoard from '../components/mine-sweeper-board/MineSweeperBoard.vue';
import request from 'superagent';
import Base from '../services/base';
import moment from 'moment';

const data = function () {
	return {
		gameData: {}
	}
};

const methods = {
	setData(err, game) {
		if (err) {
			this.error = err.toString();
		} else {
			this.gameData = game;

			setInterval(() => {
				this.gameStatus == 'Game Over' || this.gameStatus == 'Game Completed' ? clearInterval() : this.gameData.time += 1000;
			}, 1000);
		}
	},
	logOut() {
      this.$router.push({path: '/'});
    },
	updateGame(newGameData) {
		this.gameData.grid_status = newGameData.status;
	},
	backToProfile() {
		this.$router.push({path: '/my-account/' + this.gameData.user_id.$oid});
	}
};

export default {
	components: {
		MineSweeperBoard
	},
	data,
	methods,
	beforeRouteEnter (to, from, next) {
		request
		.get(Base.BASE_ENDPOINTS + '/games/' + to.params.game_id)
		.end((err, res) => {
			next(vm => vm.setData(err, res.body));
		});
	},
	computed: {
		formatedTime: function () {
			return moment(this.gameData.time).format("mm:ss");
		},
		gameStatus: function () {
			var status;
			switch(this.gameData.grid_status) {
				case 'FINISHED': 
					status = 'Game Completed';
					break;
				case 'OVER':
					status = 'Game Over';
					break;
				default:
					status = 'In Game';
			}
			return status;
		}
	}
}
</script>
