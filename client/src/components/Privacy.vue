<template>
  <div id="privacy">

    <HeaderNonApp></HeaderNonApp>

    <div class="inner">
      <h1>Recipe Saver Privacy Policy</h1>
      <p>Your privacy is important to us. It is Recipe Saver's policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.</p>

      <h2>What data do we collect from you?</h2>
      <p>When you join Recipe Saver, we ask for information that will identify you as a user. This information includes your name, email address, and the time that you last logged into the site. Recipes that are posted to Recipe Saver from the user are saved in our database until deleted by the user or by Recipe Saver. Your anonymous information (i.e. not personal data), collected using cookies and web beacons, is shared with a third-party analytics company to provide us with information about how visitors use our sites. We use this information to help us learn things like what pages are most attractive to our visitors, what products our users are interested in, and what kinds of services they like to see.</p>
      
      <h2>How do we use your personal data?</h2>
      <p>Your data is used for account management and service. Recipe Saver never supplies your personal information to any third party for advertising or promotional purposes. If you owe money to Recipe Saver and we are unable to collect it, we may need to give your contact information to a third party for collection purposes. We will occasionally use your email address to send you information regarding Recipe Saver and the services we provide.</p>
      
      <h2>Is my personal information secure?</h2>
      <p>Your personal information is protected by your password. Never share this password with anyone. We have taken steps to ensure our databases are secure, and are confident in our ability to keep your information safe.</p>
      
      <h2>How are cookies or localStorage used?</h2>
      <p>Recipe Savers stores cookie and localStorage objects on your computer to track you while you are on the site. The information in this cookie is a string of characters that is meaningless to everyone and everything except our server. No personal information or bid information is stored in the cookie. The information in the cookie can not be used by third parties to gain access to your account information.</p>
      
      <h2>How are payments handled?</h2>
      <p>We use a third party payment processor to process payments made to us. In connection with the processing of such payments, we do not retain any personally identifiable information or any financial information such as credit card numbers. Rather, all such information is provided directly to our third party processor, Stripe, whose use of your personal information is governed by their privacy policy, which may be viewed at <a target="_blank" href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a>.</p>
      
      <h2>Still have questions?</h2>
      <p>We realize everyone has a different view on privacy. We take your privacy very seriously. If you still have concerns, or are unclear about any aspect of our privacy policy, please contact us, and we will be happy to discuss the matter with you.</p>
      


      
      <p>We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. Recipe Saver may change this privacy policy from time to time at Recipe Saver's sole discretion.</p>
    </div>

    <Footer></Footer>

  </div>
</template>

<script>
import HeaderNonApp from '@/components/HeaderNonApp.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    HeaderNonApp,
    Footer
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    window.scrollTo(0,0);
  },
  beforeCreate() {
    document.body.className = 'privacy';
  }
}
</script>

<style lang="scss">
#privacy {
  @import '@/styles/_terms-privacy.scss';
}
</style>

