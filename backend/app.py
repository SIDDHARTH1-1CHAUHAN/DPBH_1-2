from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import subprocess
import pandas as pd
import native_messaging_host

app = Flask(__name__)
CORS(app)

@app.route('/',methods = ['POST', 'GET'])
def result():
    data = request.get_json()
    data=data['value']
    print(data)
    print(type(data))
    with open('Bern096.pickle','rb') as f:
        model=pickle.load(f)
    prediction=(model.predict([data])[0])
    print(prediction)
    if(prediction==1):
        result="It is a Dark Pattern"
    else:
        result="It is not a Dark Pattern"
    return jsonify(result=result)

@app.route('/url',methods = ['POST', 'GET'])
def url():
    global data
    data = request.get_json()
    data=data['value']
    print(data)
    print(type(data))
    text_file = open("url.txt", "w")
    text_file.write(data)
    text_file.close()
    return jsonify(result="success")

@app.route('/data',methods = ['POST', 'GET'])
def data():
    spider_name = "darkpatterns"
    subprocess.check_output(['scrapy', 'crawl', spider_name, "-O", "output.csv"])
    # with open("output.csv") as items_file:
    #     output= items_file.read()
    #     # df2= items_file.read()
    df=pd.read_csv('output.csv')
    df_1_css=df[['1','1_selector']].rename(columns={'1':'sentence','1_selector':'selector'})
    df_2_css=df[['2','2_selector']].rename(columns={'2':'sentence','2_selector':'selector'})
    df_3_css=df[['3','3_selector']].rename(columns={'3':'sentence','3_selector':'selector'})
    result_df=pd.concat([df_1_css,df_2_css,df_3_css],ignore_index=True)
    result_df['sentence'].fillna('',inplace=True)
    with open('Bern096.pickle','rb') as f:
        model=pickle.load(f)
    # results=[]
    def preval(text):
        n=model.predict_proba([text])
        if n[0,1]>0.99:
            return True
        else:
            return False
    df=result_df
    df['value']=df.sentence.apply(preval)
    with open('Rf093.pickle','rb') as f:
        model=pickle.load(f)
    df['category_type']='Nan'
    n=len(df)
    for i in range(n):
        if df['value'][i]==True:
            n=model.predict([df['sentence'][i]])
            if n==1:
              df['category_type'][i]='Scarcity'
            if n==2:
              df['category_type'][i]='Social Proof'
            if n==3:
              df['category_type'][i]='Urgency'
            if n==4:
              df['category_type'][i]='Misdirection'
            if n==5:
              df['category_type'][i]='Obstruction'
            if n==6:
              df['category_type'][i]='Sneaking'
            if n==7:
              df['category_type'][i]='Forced Action'
    newdf = df[df['value']]
    list_of_items = newdf.values.tolist()  

    # output=preval(df)
    # output=["first","second"]
    # print(type(result))
    # result=["Line1","Line2","Line3"]
    # outputlist=""
    # count=1
    # outputstring=""
    # for i in output:
    #     outputstring=outputstring+f"Dark Pattern {count}: {i} \n"
    #     count=count+1
    detected=False
    if(len(list_of_items)>0):
       detected=True
    return jsonify(result=list_of_items,detected=True)

@app.route('/email',methods = ['POST', 'GET'])
def email():
    subscriptions = request.get_json()
    subscriptions=subscriptions['subscriptions']
    native_messaging_host.main(subscriptions)
    return jsonify(result="success")

if __name__ == '__main__':
    app.run(debug=True)
