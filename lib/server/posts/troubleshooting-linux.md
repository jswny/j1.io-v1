The most important thing I've learned from years of using Linux is how to troubleshoot problems. I've compiled a list of the most useful tips for fixing almost any Linux problem. Please enjoy but [use these at your own risk](http://stopdisablingselinux.com/)!

1. **`chmod` Everything**
Your first step should be to give everything in sight permission to execute. This will allow any shy processes their fair share of your server. Try it out: `chmod -R 777`

2. **Disable SELinux**
This sneaky "feature" of Linux really just exists to make your life harder. Therefore, let's just turn it off forever: `setenforce 0`

And there you have it, you've successfully solved 99% of Linux problems! Congratulations, Bobby Tables, you did it!