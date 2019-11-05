<template>
  <div id="terms">

    <HeaderNonApp></HeaderNonApp>

    <div class="inner">
      <h1>Recipe Saver Terms of Service</h1>
      
      <p>By accessing the website at recipesaver.me, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
      
      <h2>Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on Recipe Saver's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

      <ul>
        <li>modify or copy the materials;</li>
        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
        <li>attempt to decompile or reverse engineer any software contained on Recipe Saver's website;</li>
        <li>remove any copyright or other proprietary notations from the materials; or</li>
        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
      </ul>
      
      </p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Recipe Saver at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
        
      
      <h2>Disclaimer</h2>
      <p>The materials on Recipe Saver's website are provided on an 'as is' basis. Recipe Saver makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Recipe Saver does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
        
      <h2>Limitations</h2>
      <p>In no event shall Recipe Saver or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Recipe Saver's website, even if Recipe Saver or a Recipe Saver authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
      
      <h2>Accuracy of materials</h2>
      <p>The materials appearing on Recipe Saver's website could include technical, typographical, or photographic errors. Recipe Saver does not warrant that any of the materials on its website are accurate, complete or current. Recipe Saver may make changes to the materials contained on its website at any time without notice. However Recipe Saver does not make any commitment to update the materials.</p>
      
      <h2>Links</h2>
      <p>Recipe Saver has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Recipe Saver of the site. Use of any such linked website is at the user's own risk.</p>
      
      <h2>Modifications</h2>
      <p>Recipe Saver may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

      <h2>Security</h2>
      <p>Recipe Saver takes reasonable steps to protect the Personal Data provided via the Services from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. However, no Internet or email transmission is ever fully secure or error free. In particular, email sent to or from the Services may not be secure. Therefore, you should take special care in deciding what information you send to us via email. Please keep this in mind when disclosing any Personal Data to Recipe Saver via the Internet.</p>

      <h2>Children</h2>
      <p>Recipe Saver does not knowingly collect Personal Data from children under the age of 13. If you are under the age of 13, please do not submit any Personal Data through our site. We encourage parents and legal guardians to monitor their children's Internet usage and to help enforce our Privacy Policy by instructing their children never to provide Personal Data on the Services without their permission. If you have reason to believe that a child under the age of 13 has provided Personal Data to Recipe Saver through the site, please contact us, and we will endeavor to delete that information from our databases.</p>
      
      <h2>Special Provisions</h2>
      <p>User-posted content on Recipe Saver is not guaranteed to be stored, kept, or backed up for any length of time. By using this site you agree to allow Recipe Saver to modify or delete any content posted in your account at any time for any reason. We make no guarantee to the preservation of this data but will make reasonable efforts to notify you if such an event is ever anticipated. While paid accounts are entitled to "unlimited" recipe storage, this does not include cases where Recipe Saver deems the amount of recipes (or content contained within a single recipe) as excessive. A single recipe record containing over 100 kilobytes of data, or an account possessing over 5 megabytes of combined recipe records is deemed excessive and is grounds for deletion.</p>

      <h2>Governing Law</h2>
      <p>These terms and conditions are governed by and construed in accordance with the laws of Texas and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
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
    document.body.className = 'terms';
  }
}
</script>

<style lang="scss">
#terms {
  @import '@/styles/_terms-privacy.scss';
}
</style>

