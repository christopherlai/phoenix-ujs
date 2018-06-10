# PhoenixUJS

One for one port of Rails UJS.

## Install
```js
yarn add https://github.com/christopherlai/phoenix-ujs.git
```

Add MIME types to `config.exs`
```elixir
config :mime, :types, %{
  "text/javascript" => ["js"],
  "application/javascript" => ["js"],
  "application/ecmascript" => ["js"],
  "application/x-ecmascript" => ["js"]
}
```

Recompile mime.
```exlixir
$ mix deps.clean mime --build
$ mix deps.get
```

## Usage
Add MIME type to router `accepts` plug.
```elixir
plug(:accepts, ["html", "js"])
```

Set `data-remote="true"` on forms.
```html
  <%= form_for @changeset, @action, [data: [remote: true]], fn f -> %>
    ...
  <% end %>

```

Handle the `js` format type in the controller.
```elixir
def create(conn, params) do
  conn
  |> put_resp_content_type("application/javascript")
  |> render("create.js")
end
```

Create `.js` file
```javascript
console.log("Hello!");
```
