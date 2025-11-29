import { Box, Heading, Text, List, Link, Separator } from "@chakra-ui/react";

export const PrivacyPolicyPage = () => {
  return (
    <Box fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" maxW="container.md" p={4}>
      <Heading as="h1" mb={4} size="md">
        Privacy Policy
      </Heading>

      <Text mb={4}>
        This privacy policy applies to the loa-work app (hereby referred to as "Application") for
        mobile devices that was created by Kubrickcode (hereby referred to as "Service Provider") as
        a Free service. This service is intended for use "AS IS".
      </Text>

      <Heading as="h2" mb={3} size="sm">
        Information Collection and Use
      </Heading>
      <Text mb={4}>
        The Application collects information when you download and use it. This information may
        include information such as:
      </Text>

      <List.Root listStyle="disc" mb={4} ps={4}>
        <List.Item>Your device's Internet Protocol address (e.g. IP address)</List.Item>
        <List.Item>
          The pages of the Application that you visit, the time and date of your visit, the time
          spent on those pages
        </List.Item>
        <List.Item>The time spent on the Application</List.Item>
        <List.Item>The operating system you use on your mobile device</List.Item>
      </List.Root>

      <Text mb={4}>
        The Application does not gather precise information about the location of your mobile
        device.
      </Text>

      <Box display="none">
        <Text>
          The Application collects your device's location, which helps the Service Provider
          determine your approximate geographical location and make use of in below ways:
        </Text>
        <List.Root listStyle="disc" mb={4} ps={4}>
          <List.Item>
            Geolocation Services: The Service Provider utilizes location data to provide features
            such as personalized content, relevant recommendations, and location-based services.
          </List.Item>
          <List.Item>
            Analytics and Improvements: Aggregated and anonymized location data helps the Service
            Provider to analyze user behavior, identify trends, and improve the overall performance
            and functionality of the Application.
          </List.Item>
          <List.Item>
            Third-Party Services: Periodically, the Service Provider may transmit anonymized
            location data to external services. These services assist them in enhancing the
            Application and optimizing their offerings.
          </List.Item>
        </List.Root>
      </Box>

      <Text mb={4}>
        The Service Provider may use the information you provided to contact you from time to time
        to provide you with important information, required notices and marketing promotions.
      </Text>

      <Text mb={4}>
        For a better experience, while using the Application, the Service Provider may require you
        to provide us with certain personally identifiable information, including but not limited to
        Email, userId, displayName, imageUrl. The information that the Service Provider request will
        be retained by them and used as described in this privacy policy.
      </Text>

      <Heading as="h2" mb={3} size="sm">
        Third Party Access
      </Heading>
      <Text mb={4}>
        Only aggregated, anonymized data is periodically transmitted to external services to aid the
        Service Provider in improving the Application and their service. The Service Provider may
        share your information with third parties in the ways that are described in this privacy
        statement.
      </Text>

      <Text mb={3}>
        Please note that the Application utilizes third-party services that have their own Privacy
        Policy about handling data. Below are the links to the Privacy Policy of the third-party
        service providers used by the Application:
      </Text>

      <List.Root mb={4}>
        <List.Item>
          <Link
            color="blue.500"
            href="https://www.google.com/policies/privacy/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Play Services
          </Link>
        </List.Item>
      </List.Root>

      <Text mb={3}>
        The Service Provider may disclose User Provided and Automatically Collected Information:
      </Text>

      <List.Root mb={4}>
        <List.Item>
          as required by law, such as to comply with a subpoena, or similar legal process;
        </List.Item>
        <List.Item>
          when they believe in good faith that disclosure is necessary to protect their rights,
          protect your safety or the safety of others, investigate fraud, or respond to a government
          request;
        </List.Item>
        <List.Item>
          with their trusted services providers who work on their behalf, do not have an independent
          use of the information we disclose to them, and have agreed to adhere to the rules set
          forth in this privacy statement.
        </List.Item>
      </List.Root>

      <Heading as="h2" mb={3} size="sm">
        Opt-Out Rights
      </Heading>
      <Text mb={4}>
        You can stop all collection of information by the Application easily by uninstalling it. You
        may use the standard uninstall processes as may be available as part of your mobile device
        or via the mobile application marketplace or network.
      </Text>

      <Heading as="h2" mb={3} size="sm">
        Data Retention Policy
      </Heading>
      <Text mb={4}>
        The Service Provider will retain User Provided data for as long as you use the Application
        and for a reasonable time thereafter. If you'd like them to delete User Provided Data that
        you have provided via the Application, please contact them at{" "}
        <Link color="blue.500" href="mailto:kubrickcode@gmail.com">
          kubrickcode@gmail.com
        </Link>{" "}
        and they will respond in a reasonable time.
      </Text>

      <Heading as="h2" mb={3} size="sm">
        Children
      </Heading>
      <Text mb={4}>
        The Service Provider does not use the Application to knowingly solicit data from or market
        to children under the age of 13.
      </Text>

      <Text mb={4}>
        The Application does not address anyone under the age of 13. The Service Provider does not
        knowingly collect personally identifiable information from children under 13 years of age.
        In the case the Service Provider discover that a child under 13 has provided personal
        information, the Service Provider will immediately delete this from their servers. If you
        are a parent or guardian and you are aware that your child has provided us with personal
        information, please contact the Service Provider ({" "}
        <Link color="blue.500" href="mailto:kubrickcode@gmail.com">
          kubrickcode@gmail.com
        </Link>{" "}
        ) so that they will be able to take the necessary actions.
      </Text>

      <Heading as="h2" mb={3} size="sm">
        Security
      </Heading>
      <Text mb={4}>
        The Service Provider is concerned about safeguarding the confidentiality of your
        information. The Service Provider provides physical, electronic, and procedural safeguards
        to protect information the Service Provider processes and maintains.
      </Text>

      <Heading as="h2" mb={3} size="sm">
        Changes
      </Heading>
      <Text mb={4}>
        This Privacy Policy may be updated from time to time for any reason. The Service Provider
        will notify you of any changes to the Privacy Policy by updating this page with the new
        Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as
        continued use is deemed approval of all changes.
      </Text>

      <Text mb={4}>This privacy policy is effective as of 2025-01-04</Text>

      <Heading as="h2" mb={3} size="sm">
        Your Consent
      </Heading>
      <Text mb={4}>
        By using the Application, you are consenting to the processing of your information as set
        forth in this Privacy Policy now and as amended by us.
      </Text>

      <Heading as="h2" mb={3} size="sm">
        Contact Us
      </Heading>
      <Text mb={4}>
        If you have any questions regarding privacy while using the Application, or have questions
        about the practices, please contact the Service Provider via email at{" "}
        <Link color="blue.500" href="mailto:kubrickcode@gmail.com">
          kubrickcode@gmail.com
        </Link>
      </Text>

      <Separator my={4} />

      <Text color="text.muted" fontSize="sm">
        This privacy policy page was generated by{" "}
        <Link
          color="blue.500"
          href="https://app-privacy-policy-generator.nisrulz.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          App Privacy Policy Generator
        </Link>
      </Text>
    </Box>
  );
};
