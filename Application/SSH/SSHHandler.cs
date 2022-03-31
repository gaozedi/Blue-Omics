using System;
using System.Threading;
using System.Threading.Tasks;
using Renci.SshNet;
namespace Application.SSH
{
   public static class SSHHandler
    {
        public static void SSHSubmit()
        {
        SshClient client = null;
            AuthenticationMethod method = new PasswordAuthenticationMethod("zedigao", "CB227ax4B");
            ConnectionInfo connection = new ConnectionInfo("uhhpc.herts.ac.uk", "zedigao", method);
            Task t = Task.Run(() =>
            {
                client = new SshClient(connection);
                if (!client.IsConnected)
                {
                    Console.WriteLine("Not Connected");
                    client.Connect();
                }
                var readCommadn = client.RunCommand("cd SSHAPI;~/miniconda3/bin/fastqc -t 12 -o ./ SRR*.fastq.gz >qc.log");

                Console.WriteLine(readCommadn.Result);
            });
            TimeSpan ts = TimeSpan.FromMilliseconds(2000000);
            if (t.Wait(ts)){
                client?.RunCommand("pwd");
                Console.WriteLine("OK");
            }
            else{
                 Console.WriteLine("Unfinished, timeout. (jobs running for longer than 2000 secconds will be killed)");
            }

        }
    }
}