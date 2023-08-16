package clothes

import (
	"github.com/gofiber/fiber/v2"
)

type ClothesController struct {
	storage *ClothesStorage
}

func NewClothesController(storage *ClothesStorage) *ClothesController {
	return &ClothesController{
		storage: storage,
	}
}

type createClothesRequest struct {
	User_id     string `json:"user_id"`
	Image_url   string `json:"image_url"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type createClothesResponse struct {
	ID string `json:"id"`
}

// @Summary		Create one article of clothing.
// @Description	Create one article of clothing.
// @Tags			clothes
// @Accept			*/*
// @Produce		json
// @Param		clothes		body		createClothesRequest	true	"Clothes to create"
// @Success		200		{object}	createlothesResponse
// @Router			/clothes [post]
func (t *ClothesController) create(c *fiber.Ctx) error {
	// parse the request body
	var req createClothesRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	// create the todo
	id, err := t.storage.createClothes(req.User_id, req.Image_url, req.Name, req.Description, c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create Clothing article",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(createClothesResponse{
		ID: id,
	})
}

// @Summary		fetch all clothes.
// @Description	fetch all clothes.
// @Tags			clothes
// @Accept			*/*
// @Produce		json
// @Success		200	{object}	[]clothesDB
// @Router			/todos [get]
func (t *ClothesController) getAll(c *fiber.Ctx) error {
	// get all todos
	clothes, err := t.storage.getAllClothes(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get clothes",
		})
	}

	return c.JSON(clothes)
}

// @Summary		fetch all clothes by user.
// @Description	fetch all clothes by user.
// @Tags			clothes
// @Accept			*/*
// @Produce		json
// @Success		200	{object}	[]clothesDB
// @Router			/todos [get]
func (t *ClothesController) getClothesByUser(c *fiber.Ctx) error {
	params := c.AllParams()
	clothes, err := t.storage.getClothesByUser(c.Context(), params["id"])

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get clothes",
		})
	}
	return c.JSON(clothes)
}

func (t *ClothesController) deleteClothingArticle(c *fiber.Ctx) error {
	params := c.AllParams()

	deleted, err := t.storage.Delete(c.Context(), params["id"])

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get clothes",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"Number of Objects Deleted": deleted,
	})

}