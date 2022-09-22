from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import reverse
from matplotlib import pylab
from pylab import *
import pandas as pd
import matplotlib.pyplot as plt
from pandas.testing import assert_frame_equal
import pandas_datareader as pdr
from pmdarima.arima import auto_arima
from pandas_datareader import data, wb
import pandas_datareader
from sklearn.metrics import r2_score
import time
import datetime
import numpy as np
import re 
import tweepy 
from tweepy import OAuthHandler 
from textblob import TextBlob 
from dashboard.models import Stocksl,Users

def home(request):
    return render(request,'home.html')
 

def index(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = Users.objects.all().filter(email = email)
        if user[0].password == password:
            return HttpResponseRedirect(reverse('current'))
    else:
        return render(request,'index.html')


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        user = Users(name=username, email=email, password=password)
        user.save()
        print('Registration Successful')
        return render(request,'index.html')
    else:
        return render(request,'register.html')

class TwitterClient(object): 
    ''' 
    Generic Twitter Class for sentiment analysis. 
    '''
    def __init__(self): 
        ''' 
        Class constructor or initialization method. 
        '''
        # keys and tokens from the Twitter Dev Console 
        consumer_key = 'hf2cKv1vWp5NT0tLp0YoiEKOr'
        consumer_secret = 'pKRYZwa0kMFaTbGvt4EUwYznuZZHE8jwkuSGCkY7A1z2F7ZiaG'
        access_token = '882444351225430017-dZNl91cwk80u9vtAdUE6Om47yrG054f'
        access_token_secret = 'AtHecrFqy1IeXeu1uTwmr9C37weY4zcX98aXBhwQwzshl'

        # attempt authentication 
        try: 
            # create OAuthHandler object 
            self.auth = OAuthHandler(consumer_key, consumer_secret) 
            # set access token and secret 
            self.auth.set_access_token(access_token, access_token_secret) 
            # create tweepy API object to fetch tweets 
            self.api = tweepy.API(self.auth) 
        except: 
            print("Error: Authentication Failed") 

    def clean_tweet(self, tweet): 
        ''' 
        Utility function to clean tweet text by removing links, special characters 
        using simple regex statements. 
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)", " ", tweet).split()) 

    def get_tweet_sentiment(self, tweet): 
        ''' 
        Utility function to classify sentiment of passed tweet 
        using textblob's sentiment method 
        '''
        # create TextBlob object of passed tweet text 
        analysis = TextBlob(self.clean_tweet(tweet)) 
        # set sentiment 
        if analysis.sentiment.polarity > 0: 
            return 'positive'
        elif analysis.sentiment.polarity == 0: 
            return 'neutral'
        else: 
            return 'negative'

    def get_tweets(self, query, count = 10): 
        ''' 
        Main function to fetch tweets and parse them. 
        '''
        # empty list to store parsed tweets 
        tweets = [] 

        try: 
            # call twitter api to fetch tweets 
            fetched_tweets = self.api.search(q = query, count = count) 

            # parsing tweets one by one 
            for tweet in fetched_tweets: 
                # empty dictionary to store required params of a tweet 
                parsed_tweet = {} 

                # saving text of tweet 
                parsed_tweet['text'] = tweet.text 
                # saving sentiment of tweet 
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text) 

                # appending parsed tweet to tweets list 
                if tweet.retweet_count > 0: 
                    # if tweet has retweets, ensure that it is appended only once 
                    if parsed_tweet not in tweets: 
                        tweets.append(parsed_tweet) 
                else: 
                    tweets.append(parsed_tweet) 

            # return parsed tweets 
            return tweets 

        except tweepy.TweepError as e: 
            # print error (if any) 
            print("Error : " + str(e)) 




def current(request):
    if request.method == 'GET':
        tgl = 0
        print(tgl)
        stocks = Stocksl.objects.all()
        tickers = []
        names = []
        category = []
        exchange = []
        label = []
        for i in stocks:
            tickers.append(i.ticker)
            names.append(i.name)
            category.append(i.category)
            exchange.append(i.exchange)
            label.append(i.label)
        print(tickers,names,category,exchange,label)
        stock_list = zip(tickers,names,category,exchange,label)
        print(stock_list)
    if request.method == 'POST':
        tgl = 1
        print(tgl)
        name1 = request.POST.get('search',0)
        add_st = request.POST.get('add',0)
        rem_st = request.POST.get('remove',0)
        print(name1)
        print(add_st)
        print(rem_st)
        if add_st != 0:
            #add
            name = add_st
            f_d = name
            name = name.split(" --> ")
            stock_add = Stocksl(ticker=name[0], exchange=name[2], name=name[1], category=name[3], label=f_d)
            stock_add.save()
            stocks = Stocksl.objects.all()
            tickers = []
            names = []
            category = []
            exchange = []
            label = []
            for i in stocks:
                tickers.append(i.ticker)
                names.append(i.name)
                category.append(i.category)
                exchange.append(i.exchange)
                label.append(i.label)
            print(tickers,names,category,exchange,label)
            stock_list = zip(tickers,names,category,exchange,label)
            print(stock_list)
        elif rem_st != 0:
            #delete
            name = rem_st
            f_d = name
            name = name.split(" --> ")
            Stocksl.objects.filter(ticker=name[0]).delete()
            stocks = Stocksl.objects.all()
            tickers = []
            names = []
            category = []
            exchange = []
            label = []
            for i in stocks:
                tickers.append(i.ticker)
                names.append(i.name)
                category.append(i.category)
                exchange.append(i.exchange)
                label.append(i.label)
            print(tickers,names,category,exchange,label)
            stock_list = zip(tickers,names,category,exchange,label)
            print(stock_list)
        else:
            name = name1
            f_d = name
            name = name.split(" --> ")
            stocks = Stocksl.objects.all()
            tickers = []
            names = []
            category = []
            exchange = []
            label = []
            for i in stocks:
                tickers.append(i.ticker)
                names.append(i.name)
                category.append(i.category)
                exchange.append(i.exchange)
                label.append(i.label)
            print(tickers,names,category,exchange,label)
            stock_list = zip(tickers,names,category,exchange,label)
            print(stock_list)
        print(name)
        print("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        print(name[0])
        print(name[1])
        print(name[2])
        print(name[3])
        symbol= name[0]
        ticker = pandas_datareader.data.DataReader(symbol, 'yahoo', '2015-01-01')
        ticker.to_csv("C:\\Users\\EQuill\\Desktop\\sp\\" + symbol + ".csv")
        # print(ticker)
        data = pd.read_csv("C:\\Users\\EQuill\\Desktop\\sp\\" + symbol + ".csv" ,index_col="Date", usecols=['Date','Open'])
        train = data.loc['2015-05-01':'2019-06-01']
        test = data.loc['2019-06-02':'2020-03-25']
        lengg = len(test)
        # print(lengg)


        stepwise_model = auto_arima(train, start_p=0, start_q=0,
                                max_p=3, max_q=3, m=5,
                                start_P=0, seasonal=True,
                                d=1, D=1, trace=True,
                                error_action='ignore',  
                                suppress_warnings=True, 
                                stepwise=True)

        stepwise_model.fit(train)
        future_forecast = stepwise_model.predict(n_periods=lengg)
        future_forecast2 = pd.DataFrame(future_forecast , index= test.index , columns=['Prediction'])
        # future_forecast2.plot()
        # pd.concat([test,future_forecast2],axis=1).plot()

        x = r2_score(test,future_forecast2)
        print('score = ', x)

        xdd = []
        ydd = []
        for i in future_forecast2["Prediction"]:
            xdd.append(i)
        for row in future_forecast2.index:
            z = ((datetime.datetime.strptime(row, '%Y-%m-%d'))-datetime.datetime(1970,1,1)).total_seconds()*1000
            ydd.append(int(z))
        print(xdd)
        print(ydd)
        ydd0 = []
        for i in test["Open"]:
            ydd0.append(i)
        print(ydd0)


        #Sentimentsssssss

        # creating object of TwitterClient Class 
        api = TwitterClient() 
        # calling function to get tweets 
        tick= name[1]
        tweets = api.get_tweets(query = tick, count = 200) 

        # picking positive tweets from tweets 
        ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive'] 
        
        # percentage of positive tweets 
        if len(tweets) != 0:
            print("Positive tweets percentage: {} %".format(100*len(ptweets)/len(tweets)))
            PosTweet=(100*len(ptweets)/len(tweets))
            # picking negative tweets from tweets 
            ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative'] 
            # percentage of negative tweets 
            print("Negative tweets percentage: {} %".format(100*len(ntweets)/len(tweets)))
            NegTweets=(100*len(ntweets)/len(tweets))
            # percentage of neutral tweets 
            print("Neutral tweets percentage: {} % \ ".format(100*(len(tweets) - len(ntweets) - len(ptweets))/len(tweets)))
            
            NeuTweets=100*(len(tweets) - len(ntweets) - len(ptweets))/len(tweets)
        else:
            PosTweet = 0
            NegTweets = 0
            NeuTweets = 0

        tweetch = [PosTweet,NegTweets,NeuTweets]
        
        # # printing first 5 positive tweets 
        # print("\n\nPositive tweets:") 
        # for tweet in ptweets[:10]: 
        #     print(tweet['text']) 

        # # printing first 5 negative tweets 
        # print("\n\nNegative tweets:") 
        # for tweet in ntweets[:10]: 
        #     print(tweet['text'])
        # sizes1 = []
        # sizes1.append(PosTweet)
        # sizes1.append(NeuTweets)
        # sizes1.append(NegTweets)
        # # Data to plot
        # labels = 'Positive', 'Neutral', 'Negative'
        # sizes = sizes1
        # colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']
        # #explode = (0.1, 0, 0, 0)  # explode 1st slice
        
        # # Plot
        # plt.pie(sizes, labels=labels, colors=colors,
        # autopct='%1.1f%%', shadow=True, startangle=140)

        # plt.axis('equal')
        # plt.show()

        return render(request,'current.html',{"cur":ydd0,"pre":xdd,"dat":ydd,"tweet":tweetch,"t":tgl,"sl":stock_list,"na":tickers,"sym":symbol,"ex":name[2],"nfd":name[1],"f_d":f_d})
    return render(request,'current.html',{"t":tgl,"sl":stock_list})

# def future(request):
#     return render(request,'future.html')

# def sentiments(request):
#     return render(request,'sentiments.html')