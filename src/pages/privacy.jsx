import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyPolicy() {
  const [selectedId, setSelectedId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const gradientAnimation = {
    background: [
      "linear-gradient(45deg, #4299e1, #1e3a8a)",
      "linear-gradient(45deg, #1e3a8a, #4299e1)",
      "linear-gradient(45deg, #4299e1, #1e3a8a)",
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const sections = [
    {
      id: "info-collection",
      title: "Information Collection",
      content: `We highly value your privacy and would like to inform you that if
        you choose to engage with us through our features on the site, we
        will request your name, email, and some other details regarding your
        account to login/signup and proceed further. For device
        registration, we may also require some of your device and browser
        information. We want to assure you that our updated communication
        channels are designed with the utmost security to protect your data.`,
    },
    {
      id: "data-usage",
      title: "Data Usage",
      content: `Your data is exclusively utilized to facilitate you to experience
        our web app Blogging Vista and its related services such as alerts.
        We do not share this information with any third parties. Your trust
        is of utmost importance to us, and we handle your data with the
        highest level of care and respect.`,
    },
    {
      id: "data-security",
      title: "Data Security",
      content: `While we implement robust security measures, it's important to
        acknowledge that no internet transmission is entirely secure. By
        using our messaging feature, you acknowledge and accept the inherent
        risks associated with online communication.`,
    },
    {
      id: "account-deletion",
      title: "Account Deletion or Suspension",
      content: `We reserve the right to permanently delete or suspend any account
        found engaged in malpractices or any other misconduct. This includes
        but is not limited to fraudulent activities or any activity that
        violates our terms of service. We assure you that such actions will
        be taken with utmost discretion and in accordance with our internal
        policies. If you have any questions or concerns regarding the status
        of your account, please don't hesitate to contact us.`,
    },
    {
      id: "cookies",
      title: "Cookies",
      content: `Our platform uses cookies. By visiting our platform, you consent to
        the use of cookies which may include necessary, analytics, and other
        types of cookies.`,
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: `We retain your communication data for as long as necessary.
        Following your initial inquiry or service, we may use your
        information to send relevant updates or promotions. You have the
        freedom to opt out of our emails at any time. If you wish to have
        your data deleted, please inform us. This applies to messages across
        various platforms. Your choices and privacy are paramount.`,
    },
  ];

  return (
    <motion.div
      className="min-h-screen mb-2 rounded-md bg-gray-100 text-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      >
        <motion.div className="h-2 w-full" animate={gradientAnimation} />
        <div className="p-8">
          <motion.h1
            className="text-4xl font-bold text-center text-[#1e3a8a] mb-8"
            variants={itemVariants}
          >
            PRIVACY POLICY
          </motion.h1>

          <motion.p className="mb-6" variants={itemVariants}>
            Welcome to the Privacy Policy of Blogging Vista. We prioritize your
            privacy and want to assure you of how we collect, use, and protect
            your data:
          </motion.p>

          {sections.map((section) => (
            <motion.div
              key={section.id}
              layoutId={section.id}
              onClick={() => setSelectedId(section.id)}
              className="mb-6 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              variants={itemVariants}
            >
              <motion.h2 className="text-xl font-semibold text-[#1e3a8a] mb-2">
                {section.title}
              </motion.h2>
              <motion.p className="text-sm text-gray-600">
                Click to read more...
              </motion.p>
            </motion.div>
          ))}

          <AnimatePresence>
            {selectedId && (
              <motion.div
                layoutId={selectedId}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                >
                  <motion.h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">
                    {sections.find((s) => s.id === selectedId)?.title}
                  </motion.h2>
                  <motion.p className="text-gray-700 mb-6">
                    {sections.find((s) => s.id === selectedId)?.content}
                  </motion.p>
                  <motion.button
                    onClick={() => setSelectedId(null)}
                    className="bg-[#1e3a8a] text-white px-4 py-2 rounded hover:bg-[#4299e1] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.footer
            className="mt-12 text-center text-sm text-gray-600"
            variants={itemVariants}
          >
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <motion.a
                href="mailto:guptaeservcies@gmail.com"
                className="text-[#4299e1] hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                guptaeservcies@gmail.com
              </motion.a>
            </p>
          </motion.footer>
        </div>
      </motion.div>
    </motion.div>
  );
}
