import React, { Component } from "react";
import QuestionList from "./QuestionList/QuestionList";
import QuestionView from "./QuestionView/QuestionView";
import QuestionsContext from "../../context/QuestionsContext";
import ProtectedRoute from "../../authentication/ProtectedRoute";
import QuestionsCreate from "./QuestionCreate/QuestionsCreate";
import Auth from "../../authentication/Auth";
import AnswerEntity from "../../entities/AnswerEntity";
import QuestionEntity from "../../entities/QuestionEntity";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Redirect, Route } from "react-router-dom";

class QuestionsRouter extends Component {
  state = {
    questions: [
      new QuestionEntity(
        "quest1",
        "miroslavb45",
        "What is React?",
        '<p><span style="color: rgb(36, 39, 41);">I have started to learn&nbsp;</span><strong style="color: rgb(36, 39, 41);"><em>React</em>&nbsp;</strong><span style="color: rgb(36, 39, 41);">out of curiosity and wanted to know the difference between React and React Native - though could not find a satisfactory answer using Google. </span></p><p><span style="color: rgb(36, 39, 41);">React and React Native seems to have the same format. Do they have completely different syntax?</span></p>',
        [
          new AnswerEntity(
            "id1",
            "react_guru16",
            '<p>\r\n    <a href="https://facebook.github.io/react/" target="_blank" style="font-family: inherit; color: rgb(0, 89, 153);">ReactJS</a>&nbsp;is a JavaScript library, supporting both front-end web and being run on a server, for building user interfaces and web applications.</p>\r\n<p>\r\n    <a href="https://facebook.github.io/react-native/" target="_blank" style="font-family: inherit; color: rgb(0, 89, 153);">React Native</a>&nbsp;is a mobile framework that compiles to native app components, allowing you to build native mobile applications for different platforms (iOS, Android, and Windows Mobile) in JavaScript that allows you to use ReactJS to build your\r\n    components, and implements ReactJS under the hood.</p>\r\n<p>Both are open sourced by Facebook.</p>',
            true
          ),
          new AnswerEntity(
            "id2",
            "mike26",
            "<p>ReactJS is a framework for building an hierarchy of UI components. Each component has state and props. Data flows from the top to low-level components via props. The state is updated in the top-level component using event handlers.</p>\r\n<p>React native uses React framework for building components for mobile apps. React native provides a basic set of components for both iOS and Android platforms. Some of the components in React Native are Navigator, TabBar, Text, TextInput, View, ScrollView.\r\n    These components use native iOS UIKit and Android UI components internally. React native also allows NativeModules where code written in ObjectiveC for iOS and Java for Android can be used within JavaScript.</p>",
            false
          ),
          new AnswerEntity(
            "id3",
            "Ryocode",
            '<p>\r\n    <strong style="font-family: inherit;">First, the similarities:</strong>&nbsp;Both react &amp; react-native (RN) were designed to allow developers to create flexible user interfaces. There are tons of benefits to these frameworks, but the most fundamental take-away is that they\'re made\r\n    for UI-development.</p>\r\n<p>\r\n    <br>\r\n</p>\r\n<p>\r\n    <strong style="font-family: inherit;">React:</strong>&nbsp;Facebook (who developed RN a few years after react) designed this framework to be almost like writing your JavaScript inside of your HTML/XML, which is why the tags are called "\r\n    <em style="font-family: inherit;">JSX</em>" (JavaScript XML) (e.g. the familiar HTML-like tags such as&nbsp;\r\n    <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">&lt;div&gt;</code>&nbsp;or&nbsp;\r\n    <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">&lt;p&gt;</code>). A hallmark of React is the capital-letter tags which denote a custom component, such as&nbsp;\r\n    <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">&lt;MyFancyNavbar /&gt;</code>, which is also true for RN. However, where they differ is in that React uses&nbsp;\r\n    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" target="_blank" style="font-family: inherit; color: rgb(0, 89, 153);">the DOM</a>. Since the DOM exists for HTML, React is therefore used for web development.</p>\r\n<p>\r\n    <br>\r\n</p>\r\n<p>\r\n    <strong style="font-family: inherit;">React Native:</strong>&nbsp;RN does not use HTML, and therefore, it is not used for web development. It is used for... virtually everything else! Mobile development (both iOS &amp; Android), smart-devices (e.g. watches, TVs), augmented reality, etc.\r\n    Since RN has no DOM to interact with, instead of using the same sort of HTML tags used in React, it uses its own tags that are then compiled into other languages. For example, instead of&nbsp;\r\n    <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">&lt;div&gt;</code>&nbsp;tags, RN developers will uses RN\'s built-in&nbsp;\r\n    <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">&lt;View&gt;</code>&nbsp;tag, which will compile into other native code under the hood (e.g.&nbsp;\r\n    <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">android.view</code>&nbsp;on Android; and&nbsp;\r\n    <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">UIView</code>&nbsp;on iOS).</p>\r\n<p>\r\n    <em style="font-family: inherit;">In short: they\'re very similar (for UI development) but used for different mediums.</em>\r\n</p>',
            false
          )
        ]
      ),
      new QuestionEntity(
        "quest2",
        "user29",
        "What is the difference between state and props in React?",
        '\r\n<p>I was watching a Pluralsight course on React and the instructor stated that props should not be changed. I\'m now reading&nbsp;\r\n    <a href="https://github.com/uberVU/react-guide/blob/master/props-vs-state.md" target="_blank" style="font-family: inherit; color: rgb(0, 89, 153);">an article (uberVU/react-guide)</a>&nbsp;on props vs. state and it says</p>\r\n<p>\r\n    <br>\r\n</p>\r\n<blockquote>Both props and state changes trigger a render update.</blockquote>\r\n<p>\r\n    <br>\r\n</p>\r\n<p>Later in the article it says:</p>\r\n<p>\r\n    <br>\r\n</p>\r\n<blockquote>Props (short for properties) are a Component\'s configuration, its options if you may. They are received from above and immutable.</blockquote>\r\n<ul>\r\n    <li>So props can change but they should be immutable?</li>\r\n    <li>When should you use props and when should you use state?</li>\r\n    <li>If you have data that a React component needs, should it be passed through props or setup in the React component via&nbsp;\r\n        <code style="font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; background-color: rgb(239, 240, 241);">getInitialState</code>?</li>\r\n</ul>\r\n<p>\r\n    <br>\r\n</p>',
        [
          new AnswerEntity(
            "id1",
            "miroslavb45",
            '<p>For parent-child communication, simply pass props.</p>\r\n<p>Use&nbsp;\r\n    <strong style="font-family: inherit;">state</strong>&nbsp;to store the data your current page needs in your controller-view.</p>\r\n<p>Use&nbsp;\r\n    <strong style="font-family: inherit;">props</strong>&nbsp;to pass data &amp; event handlers down to your child components.</p>\r\n<p>These lists should help guide you when working with data in your components.</p>\r\n<p>\r\n    <br>\r\n</p>\r\n<p>\r\n    <strong style="font-family: inherit;">Props</strong>\r\n</p>\r\n<ul>\r\n    <li>are immutablewhich lets React do fast reference checks</li>\r\n    <li>are used to pass data down from your view-controlleryour top level component</li>\r\n    <li>have better performanceuse this to pass data to child components</li>\r\n    <li>\r\n        <br>\r\n    </li>\r\n</ul>\r\n<p>\r\n    <strong style="font-family: inherit;">State</strong>\r\n</p>\r\n<ul>\r\n    <li>should be managed in your view-controlleryour top level component</li>\r\n    <li>is mutable</li>\r\n    <li>has worse performance</li>\r\n    <li>should not be accessed from child componentspass it down with props instead</li>\r\n</ul>\r\n<p>\r\n    <br>\r\n</p>'
          ),
          new AnswerEntity(
            "id2",
            "davee",
            '<p>\r\n    <strong style="font-family: inherit;">What Components Should Have State?</strong>\r\n</p>\r\n<p>Most of your components should simply take some data from props and render it. However, sometimes you need to respond to user input, a server request or the passage of time. For this you use state.</p>\r\n<p>Try to keep as many of your components as possible&nbsp;\r\n    <strong style="font-family: inherit;">stateless</strong>. By doing this you\'ll isolate the state to its most logical place and minimize redundancy, making it easier to reason about your application.</p>\r\n<p>A common pattern is to create several&nbsp;\r\n    <strong style="font-family: inherit;">stateless</strong>&nbsp;components that just render data, and have a stateful component above them in the hierarchy that passes its state to its children via props. The stateful component encapsulates all of the interaction logic, while the stateless\r\n    components take care of rendering data in a declarative way. -&nbsp;\r\n    <a href="https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state" target="_blank" style="font-family: inherit; color: rgb(0, 89, 153);">https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state</a>\r\n</p>\r\n<p>\r\n    <span style="font-family: inherit; color: rgb(0, 89, 153);">\r\n        <span class="ql-cursor">\uFEFF</span>\r\n    </span>\r\n</p>\r\n<p>\r\n    <strong style="font-family: inherit;">What Should Go in State?</strong>\r\n</p>\r\n<p>State should contain data that a component\'s event handlers may change to trigger a UI update. In real apps this data tends to be very small and JSON-serializable. When building a stateful component, think about the minimal possible representation of\r\n    its state, and only store those properties in this.state. Inside of render() simply compute any other information you need based on this state. You\'ll find that thinking about and writing applications in this way tends to lead to the most correct\r\n    application, since adding redundant or computed values to state means that you need to explicitly keep them in sync rather than rely on React computing them for you. -&nbsp;\r\n    <a href="https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-should-go-in-state"\r\n    target="_blank" style="font-family: inherit; color: rgb(0, 89, 153);">https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-should-go-in-state</a>\r\n</p>'
          )
        ]
      ),
      new QuestionEntity(
        "quest3",
        "anonymus",
        "When to use ES6 class based React components vs. functional ES6 React components?",
        '<p>After spending some time learning React I understand the difference between the two main paradigms of creating components.</p>\r\n<p>My question is when should I use which one and why? What are the benefits/tradeoffs of one over the other?</p><p>\r\n    <br>\r\n</p>\r\n<p>\r\n    <strong>ES6 classes:</strong>\r\n</p>\r\n<pre spellcheck="false">import React, { Component } from \'react\'; export class MyComponent extends Component { render() { return ( &lt;div&gt;&lt;/div&gt; ); } }\r\n</pre>\r\n<p>\r\n    <br>\r\n</p>\r\n<p>\r\n    <strong>Functional</strong>:</p>\r\n<pre spellcheck="false">const MyComponent = (props) =&gt; { return ( &lt;div&gt;&lt;/div&gt; ); }\r\n</pre>\r\n<p>I\u2019m thinking functional whenever there is no state to be manipulated by that component, but is that it?</p>\r\n<p>I\u2019m guessing if I use any life cycle methods, it might be best to go with a class based component.</p>',
        []
      )
    ]
  };

  render() {
    return (
      <QuestionsContext.Provider
        value={{
          questions: this.state.questions,
          getQuestion: this.getQuestion,
          addNewQuestion: this.addNewQuestion,
          deleteQuestion: this.deleteQuestion,
          addNewAnswer: this.addNewAnswer,
          deleteAnswer: this.deleteAnswer,
          updateQuestion: this.updateQuestion,
          updateAnswer: this.updateAnswer,
          toggleCorrectAnswer: this.toggleCorrectAnswer,
          filterValue: this.state.filterValue
        }}
      >
        <Sidebar>
          <Header onFilterChange={this.onFilterChange} />
          <Route to="/" exact>
            <Redirect to="/questions"></Redirect>
          </Route>
          <ProtectedRoute path="/questions" exact component={QuestionList} />
          <ProtectedRoute
            path="/my-questions"
            exact
            component={props => (
              <QuestionList {...props} filterByAuthor={Auth.getActiveUser()} />
            )}
          />

          <ProtectedRoute
            path={"/questions/:id"}
            exact
            component={QuestionView}
          />
          <ProtectedRoute
            path="/new-question"
            exact
            component={QuestionsCreate}
          />
        </Sidebar>
      </QuestionsContext.Provider>
    );
  }

  getQuestion = id => {
    return this.state.questions.find(question => question.id === id);
  };

  addNewAnswer = answer => {
    const newQuestions = [...this.state.questions];
    let question = newQuestions.find(
      question => question.id === answer.questionId
    );
    delete answer.questionId;

    question.answers.push(answer);
    this.setState({ question: newQuestions });
  };

  deleteAnswer = (answerId, questionId) => {
    const newQuestions = [...this.state.questions];
    let question = newQuestions.find(question => question.id === questionId);

    const answerToDelete = question.answers.find(
      answer => answer.id === answerId
    );
    question.answers.splice(question.answers.indexOf(answerToDelete), 1);

    this.setState({ question: newQuestions });
  };

  addNewQuestion = question => {
    const newQuestions = [...this.state.questions];
    newQuestions.push(question);

    this.setState({ questions: newQuestions });
  };

  deleteQuestion = (questionId, callback) => {
    const newQuestions = [...this.state.questions];
    let question = newQuestions.find(question => question.id === questionId);
    newQuestions.splice(newQuestions.indexOf(question), 1);

    this.setState({ questions: newQuestions }, callback(newQuestions));
  };

  updateQuestion = updatedQuestion => {
    const newQuestions = [...this.state.questions];
    let questionToEdit = newQuestions.find(
      question => question.id === updatedQuestion.id
    );

    questionToEdit.title = updatedQuestion.title;
    questionToEdit.content = updatedQuestion.content;
    this.setState({ questions: newQuestions });
  };

  updateAnswer = (questionId, answerId, answerContent) => {
    const newQuestions = [...this.state.questions];
    const question = newQuestions.find(question => question.id === questionId);
    const currentAnswers = question.answers;

    const answerToUpdate = currentAnswers.find(
      answer => answer.id === answerId
    );
    answerToUpdate.content = answerContent;

    this.setState({ questions: newQuestions });
  };

  toggleCorrectAnswer = (answerId, questionId) => {
    const newQuestions = [...this.state.questions];
    const question = newQuestions.find(question => question.id === questionId);
    const answer = question.answers.find(answer => answer.id === answerId);
    answer.isCorrect = !answer.isCorrect;

    this.setState({ questions: newQuestions });
  };
  onFilterChange = e => {
    this.setState({ filterValue: e });
  };
}

export default QuestionsRouter;
