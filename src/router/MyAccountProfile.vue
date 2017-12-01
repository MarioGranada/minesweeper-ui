//- <template lang="jade">
//-   .bg-color-light.tablet-padding
//-     .col-md-base.center-container
//-       .p-xs.padded-container.mt-s.row.center-sm.center-xs
//-         .row.mb-xs.col-sm-12.col-xs-12
//-           text-field(:value.sync="userData.firstName", icon="user", :validation-rules="{required: true}", :is-valid.sync="isInputValid.fName")
//-         .row.mb-xs.col-sm-12.col-xs-12
//-           text-field(:value.sync="userData.lastName", icon="user", :validation-rules="{required: true}", :is-valid.sync="isInputValid.lName")
//-         .row.mb-xs.col-sm-12.col-xs-12
//-           text-field(:value.sync="userData.phone", icon="phone", :validation-rules="{required: false}")
//-         .row.mb-xs.col-sm-12.col-xs-12
//-           text-field(:value.sync="userData.email", type="email", icon="mail", :validation-rules="{required: true}", :is-valid.sync="isInputValid.email")
//-         .row.mb-xs.col-sm-8.col-xs-12
//-           .col-xs.col-sm.ph-0
//-             //- border-button(button-copy="delete account", button-link="/delete-account", button-color="Red")
//-           .col-xs.col-sm.ph-0
//-             //- border-button(button-copy="change password", button-link="/change-password", button-color="Red")
//-         .row.mb-s.col-sm-12.col-xs-12
//-           p(v-show="requestError") {{getUser.requestStatus.message}}
//-           p(v-show="requestSuccess") Your account has been updated successfuly!
//-         .row.mb-s.col-sm-12.col-xs-12
//-           //- nw-button(button-color="red", :disabled="!isFormValid", @click="saveProfileChanges()")
//-             | Save Changes
//-         .row.col-xs-12.col-sm-12
//-           .col-xs-12.text-center.main-color-text.mv-s.fs-12.underline.my-account-log-out-link
//-             span(@click="logOut()") Log out
//-   //delete account confirmation modal
//-   modal(:show.sync="deleteAccountModal")
//-     .delete-account-modal(v-show="!farewellMessage")
//-       .row.center-xs
//-         .col-xs-9.main-color-text.fs-18.text-center
//-           | Delete your Clubcard account
//-       .row.center-xs.mt-xs
//-         .col-xs-12.darker-color-text.bold.text-center
//-           | What happens when you delete your clubcard account:
//-       .row.middle-color-text.mv-s.text-center
//-         .col-xs-12.mb-xs
//-           | 1. Point one about what happens when you delete your Clubcard account
//-         .col-xs-12
//-           | 2. Point two about what will happen afterwards.
//-       .row.center-xs
//-         .col-xs-9
//-           //- nw-button(@click="onDeleteAccount")
//-             | Delete my account
//-     .farewellMessage(v-show="farewellMessage")
//-       .row.center-xs.mb-xs
//-         .col-xs-10.fs-18.main-color-text.text-center.bold
//-           | Hope to see you in store
//-       .row.text-center.m-xs
//-         .col-xs-12
//-           | You won´t be able to sign again.
//-           br
//-           | If you want to register again in the future please do.
//-       .row.center-xs
//-         .col-xs-9
//-           //- nw-button(@click="toggleDeleteModal")
//-             | Ok, farewell
//- </template>

//- <script>
//-   import NwButton from '../components/nw-button/NwButton.vue';
//-   import BorderButton from '../components/border-button/BorderButton.vue';
//-   import Modal from '../components/modal/Modal.vue';
//-   import TextField from '../components/text-field/TextField.vue';
//-   import { getUser, getUserProfile } from '../vuex/getters';
//-   import { updateUserProfile, logoutUser } from '../vuex/actions/user';

//-   const data = function(){
//-     return {
//-       deleteAccountModal: false,
//-       farewellMessage: false,
//-       userData: Object.assign({}, this.userProfile),
//-       isInputValid:{}
//-     }
//-   }

//-   const computed = {
//-     isFormValid: function() {
//-       let inputValid = this.isInputValid;
//-       return Object.keys(inputValid).every(function(k){
//-         return inputValid[k] === true;
//-       });
//-     },
//-     requestSuccess: function() {
//-       return this.getUser.requestStatus.successful && this.getUser.requestStatus.action == "updateUserProfile";
//-     },
//-     requestError: function() {
//-       return !this.getUser.requestStatus.successful && this.getUser.requestStatus.action == "updateUserProfile";
//-     },
//-   }

//-   const methods = {
//-     toggleDeleteModal() {
//-       this.$set('deleteAccountModal', !this.deleteAccountModal);
//-     },
//-     onDeleteAccount() {
//-       this.$set('farewellMessage', true);
//-     },
//-     saveProfileChanges(){
//-       this.updateUserProfile(this.userData);
//-     },
//-     logOut(){
//-       this.logoutUser();
//-       this.$route.router.go({path: '/login'})
//-     }
//-   }

//-   const components = {
//-     NwButton,
//-     Modal,
//-     TextField,
//-     BorderButton,
//-   }

//-   const vuex = {
//-     getters:{
//-       getUser,
//-       userProfile: getUserProfile
//-     },
//-     actions: {
//-       updateUserProfile,
//-       logoutUser
//-     }
//-   }

//-   export default {
//-     data,
//-     computed,
//-     methods,
//-     components,
//-     vuex
//-   }
//- </script>
