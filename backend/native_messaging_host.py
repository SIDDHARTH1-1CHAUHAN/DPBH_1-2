import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json
from datetime import datetime, timedelta
import sys

def check_subscriptions_and_send_reminders(subscriptions):
    for subscription in subscriptions:
        # purchase_date = datetime.strptime(subscription['date'], '%Y-%m-%d')
        # renewal_cycle = int(subscription['cycle'])
        # next_renewal_date = purchase_date + timedelta(days=renewal_cycle * 30)

        # reminder_date = next_renewal_date - timedelta(days=1)

        # if reminder_date.date() == datetime.now().date() + timedelta(days=1):
        send_email(subscription)

def send_email(subscription):
    password = "fspo vwns rrko vohj"
    me = "teampatternhunters@gmail.com"
    you = subscription["email"]

    email_body = f"""
    <html>
    <body>
    <p>
    Hello,<br><br>This is a reminder that your subscription '{subscription['name']}' will renew soon.
    </p>
    </body>
    </html>
    """

    message = MIMEMultipart('alternative', None, [MIMEText(email_body, 'html')])
    message['Subject'] = 'Subscription Renewal Reminder'
    message['From'] = me
    message['To'] = you

    try:
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.ehlo()
        server.starttls()
        server.login(me, password)
        server.sendmail(me, you, message.as_string())
        server.quit()
        print('Email sent')
    except Exception as e:
        print('Error:', e)

def main(subscriptions):
    # while True:
    #     try:
            # message = json.loads(sys.stdin.readline())
            # if message.get('command') == 'checkSubscriptionsAndSendReminders':
            #     subscriptions = message.get('subscriptions', [])
    check_subscriptions_and_send_reminders(subscriptions)
        # except (ValueError, KeyError):
        #     break


if __name__ == '__main__':
    main()
