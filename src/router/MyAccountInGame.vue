<template lang='jade'>
.game-container.row
	mine-sweeper-board(:game = 'gameData' @update = "updateGame")
	.row.col-xs-12.start-xs
		.col-xs-6
			| Time
			{{formatedTime}}
		.col-xs-6
			| Game Status
			{{gameStatus}}
		.col-xs-3
			button(@click = 'saveGame()') Save Game
		.col-xs-3.text-center.my-account-back-link
			span(@click='backToProfile()') Back
		.col-xs-3.my-account-log-out-link.start-xs(@click='logOut()') Log out
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
				this.gameStatus != 'Game Over' ? this.gameData.time += 1000 : clearInterval();
			}, 1000);
		}
	},
	saveGame() {},
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
