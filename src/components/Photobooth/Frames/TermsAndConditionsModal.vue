<template>
  <v-row justify="center">
    <v-dialog
      v-model="showPrompt"
      scrollable
      max-width="800px"
    >
      <v-card class="card">
        <v-card-text style="height: 500px;">
          <div class="terms-and-conditions-wrapper">
          <br><h3 class="text-center">COLGATE-PALMOLIVE NATIONAL SALES CONVENTION 2021</h3><br>

          <strong>Terms and Conditions</strong><br>

          By accessing this site, you acknowledge and agree to all of our terms, conditions, and privacy policies below, and otherwise contained on or referenced in this site (the "Agreement"). If you do not agree to this Agreement, you are not authorized to access this site. You also acknowledge and agree that, unless we specifically provide otherwise, this Agreement only applies to this site and our online activities, and does not apply to any of our offline activities.

          You acknowledge and agree that all materials, including, without limitation, content, data, software, information, products and services, contained on or provided through this site ("Materials"), are protected by copyright, trademark, service mark, patent, trade secret, or other proprietary rights or laws; that except as specifically permitted by this Agreement, any use of Materials is strictly prohibited; that except if we and/or the applicable rights holder(s) give you prior written permission, you will not sell, license, rent, modify, print, copy, reproduce, download, transmit, distribute, publicly display, publicly perform, publish, edit, adapt, compile, or create derivative works from any Materials (including, without limitation, through framing or systematic retrieval to create collections, compilations, databases or directories); and that except if we give you prior written permission, use of any Web browsers (other than generally available third-party browsers), engines, software, spiders, robots, avatars, agents, tools, or other devices or mechanisms to navigate or search the site is strictly prohibited.

          You acknowledge and agree that we, in our sole discretion, at any time and with or without notice, may block or terminate your or any other party's access to all or part of the site or any Materials, or change or discontinue any aspect or feature of the site or any Materials (including, without limitation, discontinuing the site in its entirety); and that, without limitation of any other provisions of this Agreement, we reserve the right to take any actions at law or in equity that we deem appropriate in connection with the site, Materials and this Agreement. You also acknowledge and agree that, unless we specifically provide otherwise, any links on this site to other sites do not imply our endorsement of such sites or that we have any association whatsoever with the operators of such sites; that such sites are not under our control; and that we are not responsible for any materials (including, without limitation, any content, data, software, information, products or services) contained on or provided through such sites, or the appropriateness, decency, legality, copyright compliance, accuracy or any other aspect of such sites.

          <br><br><h4>ON SHOW AND WEBSITE MATERIALS</h4>

          You acknowledge and agree that this site and all “materials” are intended for Colgate-Palmolive Philippines’ internal purposes and use only.

          You acknowledge and agree that you may not take photos, videos, or screenshots of the materials including, without limitation to, the presentation slides and sensitive information to be shown on this site and during the program. You may not disseminate, distribute, or copy
          any information contained herein on, but not limited to, social media platforms and other public networks.

          <br><br><h4>YOUR PERSONAL DATA</h4>

          Personal data means any information about you which is personally identifiable, including, without limitation, your full name, address, telephone or mobile phone number, email address, social media information, registration name, password, pictorial likeness in pictures, video or animation, and other information from which you can be identified and which you disclose to us at any time.

          <br><br><h4>COLLECTION OF YOUR PERSONAL DATA</h4>

          We collect your Personal Data when:
          you register using our registration form ("Registration");
          you use the photobooth feature on the Website. The photobooth will prompt you to allow the use of your mobile phone camera or webcam. After you allow this, you can then take or upload pictures of yourself which can be classed as personal data.

          The information that you provide in Registration may include full name, address, telephone or mobile phone number, email address, social media information, registration name, password, and/or other information from which you can be identified and which you disclose to us using the registration form.

          Photos taken by the user can be stored temporarily on our servers for 2 reasons: a. for use in the Website or the livestream or video components of the website b. for transmittal to the user in the event he or she chooses to have his or her photo emailed to him or her. We will not hold on or store your pictures any longer than it is needed for use to fulfill these 2 reasons.

          <br><br><h4>USE OF YOUR PERSONAL DATA</h4>

          We use your Personal Data to:
          <ul>
            <li>send you notices for access to the main pages of the Website</li>
            <li>process and deal with any complaints or inquiries made by you ;</li>
            <li>monitor, develop and improve the Website and your experience when using the Website;</li>
            <li>process the registration of your account and maintain your account;</li>
            <li>recognize and reward top users of the Website</li>
            <li>enrich activities in the Website such as using your photos for segments in the livestream presentations</li>
          </ul>

          <br><br><h4>PASSING ON YOUR PERSONAL DATA TO THIRD PARTIES</h4>

          We may disclose your Personal Data to:
          <li>Any member of Colgate-Palmolive Philippines, Wildfire Inc., Fourello, and 3rd party website development partners (“3rd Party Developers”) on an as needed basis. 3rd Party Developers help us in developing the Website and analysing your use of the Website in order to improve the user experience. The 3rd Party Developers are bound by service contracts that ensure they keep your Personal Data private.</li>

          <br><br><h4>YOUR RIGHTS</h4>

          It is up to you to decide how we can use and handle your personal data. In order to contact us to make such a request or to let us know that you no longer want your personal details to be held by us where you have previously consented to us using your details in accordance with this privacy policy (or for any other query related to the use of your personal data), please send an email to nicole@wildfireonline.com.

          <br><br><h4>LINKS TO OTHER WEBSITES</h4>

          We may offer links to third party websites. However, we are not responsible for the content or information collection policies of third party websites. If you visit a third party website, we advise you to review their privacy and other policies. We do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to the third party websites.

          <br><br><h4>DATA RETENTION</h4>

          We will not retain your information for longer than is necessary for our business purposes or for legal requirements. However, please be advised that we may retain some information after you have closed your account with us, for instance if this is necessary to meet our legal obligations, such as retaining the information for tax and accounting purposes.

          <br><br><h4>CHANGES TO OUR PRIVACY POLICY</h4>

          We reserve the right to make changes to this website and the terms of this privacy policy by placing a notification of such changes on the website’s homepage. You are bound by such revisions once you have consented to such changes or, where permitted by law, such notification has been placed on the website’s homepage and you continue to use the website. If you do not accept any such changes, you should stop using the website and notify us by writing to us at the email address below. You should periodically visit this page to review the current terms of this privacy policy.

          <br><br><h4>CONTACTING US</h4>

          This website was created and is maintained by Fourello. If you have any questions about our privacy policy or how we use your personal data, please contact our customer service by mailing <strong>nicole@wildfireonline.com.</strong><br>
          <v-img v-on:click="closeModal" contain src="../assets/login/close-btn.png" max-height="30" max-width="300" class="close-btn mx-auto"></v-img>
          </div>
        </v-card-text>
        <!-- <v-divider></v-divider> -->
        <!-- <v-card-actions> -->
          <!-- <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn> -->
        <!-- </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      showPrompt: true
    }
  },
  methods: {
    closeModal: function () {
      this.showPrompt = false
    },
    agree: function () {
      this.checkbox = true
    }
  },
  mounted () {},
  computed: {

  }
}
</script>

<style scoped>
.modal {
  opacity: 0.9;
}
.card{
  background: url('../assets/login/modal-frame.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow-y: hidden;
}
.terms-and-conditions-wrapper{
    color:white;
    text-align: justify;
    padding: 40px;
}
.close-btn:hover{
  cursor: pointer;
}
</style>
