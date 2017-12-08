<template lang='jade'>
  .bg-color-light.tablet-padding
    .col-md-base.center-container
      .p-xs.padded-container.mt-s.row.center-sm.center-xs
        .row.col-xs-12
            mine-sweeper-board
            .col-xs-12
              button(@click = 'saveGame()') Save Game
        .row.col-xs-12.col-sm-12
          .col-xs-12.text-center.main-color-text.mv-s.fs-12.underline.my-account-log-out-link
            span(@click='backToProfile()') Back
          .col-xs-12.text-center.main-color-text.mv-s.fs-12.underline.my-account-log-out-link
            span(@click='logOut()') Log out
</template>

<script>
  import MineSweeperBoard from '../components/mine-sweeper-board/MineSweeperBoard'
  import request from 'superagent';
  import Base from '../services/base';

  const data = function(){
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
      }
    },
    saveGame() {

    },
    backToProfile() {

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
      .get(Base.BASE_ENDPOINTS + '/games/' + to.params.id)
      .end((err, res) => {
        next(vm => vm.setData(err, res.body));
      });
    }
  }
</script>
