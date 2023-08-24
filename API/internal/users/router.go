package users

import "github.com/gofiber/fiber/v2"

func AddTodoRoutes(app *fiber.App, controller *UserController) {
	todos := app.Group("/users")
	// add middlewares here

	// add routes here
	todos.Post("/", controller.create)
	todos.Get("/", controller.getAll)
}
