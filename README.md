# test-loadbalancer-nodejs

#### Create 3 servers to check server health check

![Architecture](https://i.imgur.com/7HuWq45.png)

---
- [Check-Server] accept clients.
- [Check-Server] do health check with server1 and server 2.
- [Server1] and [Server2] has main contents.
- [Clients] will connect [Server1] or [Server2] by healty environment