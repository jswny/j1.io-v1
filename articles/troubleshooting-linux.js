module.exports = {
  "title": "Troubleshooting Linux",
  "date": "1 December 2015",
  "content":
    `
      <p>
        The most important thing I've learned from years of using Linux is how to troubleshoot problems.
        I've compiled a list of the most useful tips for fixing almost any Linux problem.
        Please enjoy but <a href="//stopdisablingselinux.com/">use these at your own risk</a>!
      </p>
      <ol>
        <li>
          <strong>chmod Everything</strong>
          <br>
          Your first step should be to give everything in sight permission to execute:
          <br>
          <code>chmod -R 777</code><br><br>
        </li>
        <li>
          <strong>Disable SELinux</strong>
          <br>
          When all else fails, simply run the following command to disable SELinux (which is probably screwing something up):
          <br>
          <code>setenforce 0</code>
        </li>
      </ol>
      <p>
        And there you have it, you've successfully solved 99% of problems in Linux!
        Note: you may need to run some commands as sudo to get them to work correctly. Happy troubleshooting.
      </p>
    `
};