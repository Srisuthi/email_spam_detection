import joblib
import pandas as pd
from sklearn.model_selection import train_test_split 
from sklearn.feature_extraction.text import CountVectorizer 
from sklearn.naive_bayes import MultinomialNB 
from sklearn.pipeline import Pipeline  
from sklearn.metrics import accuracy_score

data = pd.read_csv('dataset/spam.csv')
data['Spam'] = data['Category'].apply(lambda x: 1 if x == 'spam' else 0)
data.head(5)

X_train, X_test, y_train, y_test = train_test_split(data.Message, data.Spam, test_size=0.25, random_state=42)

clf = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('nb', MultinomialNB())
])

clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')

model_filename = 'spam_detection_model.pkl'
joblib.dump(clf, model_filename)
