export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen mb-2 rounded-md bg-gray-200 text-gray-900 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#1e3a8a] mb-8">
          PRIVACY POLICY
        </h1>

        <p className="mb-6">
          Welcome to the Privacy Policy of Blogging Vista. We prioritize your
          privacy and want to assure you of how we collect, use, and protect
          your data:
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">
            Information Collection
          </h2>
          <p>
            We highly value your privacy and would like to inform you that if
            you choose to engage with us through our features on the site, we
            will request your name, email, and some other details regarding your
            account to login/signup and proceed further. For device
            registration, we may also require some of your device and browser
            information. We want to assure you that our updated communication
            channels are designed with the utmost security to protect your data.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">
            Data Usage
          </h2>
          <p>
            Your data is exclusively utilized to facilitate you to experience
            our web app Blogging Vista and its related services such as alerts.
            We do not share this information with any third parties. Your trust
            is of utmost importance to us, and we handle your data with the
            highest level of care and respect.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">
            Data Security
          </h2>
          <p>
            While we implement robust security measures, it's important to
            acknowledge that no internet transmission is entirely secure. By
            using our messaging feature, you acknowledge and accept the inherent
            risks associated with online communication.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">
            Account Deletion or Suspension
          </h2>
          <p>
            We reserve the right to permanently delete or suspend any account
            found engaged in malpractices or any other misconduct. This includes
            but is not limited to fraudulent activities or any activity that
            violates our terms of service. We assure you that such actions will
            be taken with utmost discretion and in accordance with our internal
            policies. If you have any questions or concerns regarding the status
            of your account, please don't hesitate to contact us.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">Cookies</h2>
          <p>
            Our platform uses cookies. By visiting our platform, you consent to
            the use of cookies which may include necessary, analytics, and other
            types of cookies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">
            Data Retention
          </h2>
          <p>
            We retain your communication data for as long as necessary.
            Following your initial inquiry or service, we may use your
            information to send relevant updates or promotions. You have the
            freedom to opt out of our emails at any time. If you wish to have
            your data deleted, please inform us. This applies to messages across
            various platforms. Your choices and privacy are paramount.
          </p>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:guptaeservcies@gmail.com"
              className="text-[#4299e1] hover:underline"
            >
              guptaeservcies@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
