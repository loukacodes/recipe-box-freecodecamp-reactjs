var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactBootstrap = ReactBootstrap,
    Accordion = _ReactBootstrap.Accordion,
    Panel = _ReactBootstrap.Panel,
    Modal = _ReactBootstrap.Modal,
    Button = _ReactBootstrap.Button,
    ButtonToolbar = _ReactBootstrap.ButtonToolbar,
    ListGroup = _ReactBootstrap.ListGroup,
    ListGroupItem = _ReactBootstrap.ListGroupItem;

var recipeBook = void 0;
var initialData = [{ "title": "Pho", "ingredients": "Beef bones, Rice noodles, Onion, Star anise, Ginger", "key": 0 }, { "title": "Vietnamese Spicy Beef Noodle Soup (Bun Bo Hue)", "ingredients": "Beef bones, Minced garlic, Minced lemongras, Shrimp paste", "key": 1 }, { "title": "Bun Rieu Cua", "ingredients": "Paddy crabs,Tomatoes, Onion, Eggs,  Perilla, Rice vermicelli", "key": 2 }];
if (localStorage._trangtran_recipeBook) {
  console.log(localStorage._trangtran_recipeBook);
  recipeBook = JSON.parse(localStorage._trangtran_recipeBook);
} else {
  recipeBook = initialData;
}
// recipeBook = JSON.parse(localStorage._trangtran_recipeBook);


var Recipes = function (_React$Component) {
  _inherits(Recipes, _React$Component);

  function Recipes(props) {
    _classCallCheck(this, Recipes);

    var _this = _possibleConstructorReturn(this, (Recipes.__proto__ || Object.getPrototypeOf(Recipes)).call(this, props));

    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.handleEdit = _this.handleEdit.bind(_this);
    return _this;
  }

  _createClass(Recipes, [{
    key: "handleDelete",
    value: function handleDelete() {
      this.props.onDeleteRecipe(this.props.recipe);
    }
  }, {
    key: "handleEdit",
    value: function handleEdit() {
      this.props.onEditRecipe(this.props.recipe);
    }
  }, {
    key: "render",
    value: function render() {
      var ingredients = this.props.recipe.ingredients.split(",").map(function (item, key) {
        return React.createElement(
          "li",
          { className: "list-group-item" },
          item
        );
      });

      return React.createElement(
        Panel,
        { header: this.props.recipe.title, eventKey: this.props.key, collapsible: true },
        React.createElement(
          ListGroup,
          null,
          ingredients
        ),
        React.createElement(
          "div",
          { className: "btn-group" },
          React.createElement(
            Button,
            { className: "edit-btn", onClick: this.handleEdit },
            React.createElement("i", { className: "fa fa-pencil-alt" })
          ),
          React.createElement(
            Button,
            { className: "delete-btn", onClick: this.handleDelete },
            React.createElement("i", { className: "fa fa-trash-alt" })
          )
        )
      );
    }
  }]);

  return Recipes;
}(React.Component);

;

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this2.state = {
      recipeBook: recipeBook,
      isEditing: false,
      show: false,
      title: '',
      ingredients: []
    };
    _this2.showModal = _this2.showModal.bind(_this2);
    _this2.hideModal = _this2.hideModal.bind(_this2);
    _this2.handleChange = _this2.handleChange.bind(_this2);
    _this2.onAddNewRecipe = _this2.onAddNewRecipe.bind(_this2);
    _this2.onDeleteRecipe = _this2.onDeleteRecipe.bind(_this2);
    _this2.onEditRecipe = _this2.onEditRecipe.bind(_this2);
    _this2.onSaveEditedRcipe = _this2.onSaveEditedRcipe.bind(_this2);
    return _this2;
  }

  _createClass(App, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      localStorage._trangtran_recipeBook = JSON.stringify(this.state.recipeBook);
    }
  }, {
    key: "showModal",
    value: function showModal() {
      this.setState({ show: true });
    }
  }, {
    key: "hideModal",
    value: function hideModal() {
      this.setState({
        show: false,
        title: "",
        ingredients: []
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(_ref) {
      var target = _ref.target;

      this.setState(_defineProperty({}, target.name, target.value));
    }
  }, {
    key: "onAddNewRecipe",
    value: function onAddNewRecipe() {
      if (this.state.title && this.state.ingredients) {
        var recipeBookOnLocal = JSON.parse(localStorage._trangtran_recipeBook);
        if (recipeBookOnLocal.length > 0) {
          var newRecipe = { title: this.state.title, ingredients: this.state.ingredients, key: recipeBookOnLocal[recipeBookOnLocal.length - 1].key + 1 };
        } else {
          var newRecipe = { title: this.state.title, ingredients: this.state.ingredients, key: 0 };
        }

        // this.setState({recipeBook: [...this.state.recipeBook, newRecipe]});
        recipeBook.push(newRecipe);
        this.setState({ recipeBook: recipeBook });
        this.setState({ show: false, title: '', ingredients: [] });
      } else {
        alert("please fill in the recipe title and ingredients!");
      }
    }
  }, {
    key: "onEditRecipe",
    value: function onEditRecipe(recipe) {
      this.setState({
        title: recipe.title,
        ingredients: recipe.ingredients,
        show: true,
        isEditing: true,
        editingRecipe: recipe
      });
    }
  }, {
    key: "onSaveEditedRcipe",
    value: function onSaveEditedRcipe() {
      var _this3 = this;

      var updatedRecipeBook = this.state.recipeBook.map(function (recipe) {
        if (_this3.state.editingRecipe.key == recipe.key) {
          recipe.title = _this3.state.title;
          recipe.ingredients = _this3.state.ingredients;
          return recipe;
        } else {
          return recipe;
        }
      });

      if (updatedRecipeBook) {
        this.setState({
          recipeBook: updatedRecipeBook,
          title: "",
          ingredients: [],
          show: false,
          isEditing: false
        });
      }
    }
  }, {
    key: "onDeleteRecipe",
    value: function onDeleteRecipe(recipe) {
      console.log(" on delete recipe ");
      var updatedRecipeBook = this.state.recipeBook.filter(function (item, index) {
        return recipe !== item;
      });

      if (updatedRecipeBook) {
        this.setState({
          recipeBook: updatedRecipeBook
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var isEditing = this.state.isEditing;
      var actionButton = isEditing ? React.createElement(
        Button,
        { onClick: this.onSaveEditedRcipe },
        React.createElement("i", { className: "fa fa-check" })
      ) : React.createElement(
        Button,
        { onClick: this.onAddNewRecipe },
        React.createElement("i", { className: "fa fa-plus" })
      );
      var recipes = this.state.recipeBook.map(function (recipe, key) {
        return React.createElement(Recipes, { recipe: recipe, onEditRecipe: _this4.onEditRecipe, onDeleteRecipe: _this4.onDeleteRecipe, key: key });
      });
      return React.createElement(
        "div",
        { className: "recipe-wrapper" },
        React.createElement(
          "h1",
          { className: "title" },
          "Recipe book"
        ),
        React.createElement(
          "div",
          { className: "utensils-icon" },
          React.createElement("i", { className: "fa fa-utensils" })
        ),
        React.createElement(
          Accordion,
          { id: "recipeBook" },
          recipes
        ),
        React.createElement(
          ButtonToolbar,
          null,
          React.createElement(
            Button,
            { onClick: this.showModal },
            React.createElement("i", { className: "fa fa-plus" })
          ),
          React.createElement(
            Modal,
            { show: this.state.show, onHide: this.hideModal, dialogClassName: "custom-modal" },
            React.createElement(
              Modal.Header,
              { closeButton: true },
              React.createElement(
                Modal.Title,
                { id: "contained-modal-title-lg" },
                "Add new recipe"
              )
            ),
            React.createElement(
              Modal.Body,
              null,
              React.createElement(
                "form",
                null,
                React.createElement("input", { id: "title", name: "title", value: this.state.title, onChange: this.handleChange, placeholder: "Enter recipe name" }),
                React.createElement("br", null),
                React.createElement("textarea", { id: "ingredients", name: "ingredients", value: this.state.ingredients, onChange: this.handleChange, placeholder: "Add ingredients, separated by commas..." })
              )
            ),
            React.createElement(
              Modal.Footer,
              null,
              actionButton
            )
          )
        ),
        React.createElement(
          "div",
          { className: "image" },
          React.createElement("img", { src: "http://www.pngmart.com/files/4/Cooking-PNG-Image.png", width: "20%" })
        ),
        React.createElement(
          "p",
          { className: "additional-text" },
          "Enjoy your cooking secret!"
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));