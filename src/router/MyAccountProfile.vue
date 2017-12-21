<template lang='jade'>
.row.my-account-container
	.my-account-user-info.col-xs-12.col-md-6.start-xs
		.col-xs-12
			span.fs-bold Name
			{{userData.name}}
		.col-xs-12
			span.fs-bold Email
			{{userData.email}}
		.col-xs-12
			button(@click = 'loadGames()') Load Games
		.col-xs-12.my-account-link.start-xs(@click='logOut()') Log out
	.my-account.user-menu.col-xs-12.col-md-6.start-xs
		.col-xs-12(v-if= '!newGame')
			button(@click = 'togleNewGameForm()') New Game
		game-form(:user-id = 'userData._id.$oid'
			:show = 'newGame'
			v-if= 'newGame'
			@update = 'togleNewGameForm')
	.row.col-xs-12.game-list-container
		.col-xs-12.col-md-4.start-xs.game-info-box(v-for = 'game in games')
			.col-xs-12
				| Rows
				{{game.rows}}
			.col-xs-12
				| Columns
				{{game.cols}}
			.col-xs-12
				| Number of mines
				{{game.mines_total}}
			.col-xs-12
				| Status
				{{gameStatus(game.grid_status)}}
			.col-xs-12
				| Time
				{{formatTime(game.time)}}
			.col-xs-12.center-xs
				button(@click = 'resumeGame(game)') Start/Resume Game
</template>

<script>
  import request from 'superagent';
  import Base from '../services/base';
  import moment from 'moment';
  import GameForm from '../components/game-form/GameForm.vue';

  const data = function(){
    return {
      userData: {},
      games: [],
      newGame: false,
    }
  }

  const methods = {
    logOut() {
      this.$router.push({path: '/'});
    },
    loadGames() {
      request
      .get(Base.BASE_ENDPOINTS + '/users/' + this.userData._id.$oid + '/games/')
      .end((err, res) => {
        this.games = res.body.reverse();
      });
    },
    setData(err, user) {
      if (err) {
        this.error = err.toString();
      } else {
        this.userData = user;
      }
    },
    resumeGame(game) {
      this.$router.push({path: '/my-account/games/' + game._id.$oid});
    },
    formatTime(time) {
      return moment(time).format("mm:ss");
    },
    gameStatus(gameStatus) {
      var status;
      switch(gameStatus) {
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
    },
    togleNewGameForm(){
      this.newGame = !this.newGame;
    }
  }

  export default {
    components: {
      GameForm
    },
    data,
    methods,
    beforeRouteEnter (to, from, next) {
      request
      .get(Base.BASE_ENDPOINTS + '/users/' + to.params.id)
      .end((err, res) => {
        next(vm => vm.setData(err, res.body));
      });
    }
  }
</script>
