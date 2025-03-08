import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
// import SummaryApi from '../common';
import { toast } from 'react-toastify'
import axios from 'axios';
import { ImFileWord } from 'react-icons/im';

const UploadProduct = ({
  onClose,
  fetchData
}) => {
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")
  const [image, setImage] = useState({ preview: '', raw: '' })
  const [rawImages, setRawImages] = useState([])

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setProductData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  // from edit product
  // const handleUploadProduct = async (e) => {
  //   const file = e.target.files[0]
  //   const uploadImageCloudinary = await uploadImage(file)

  //   setData((preve) => {
  //     return {
  //       ...preve,
  //       productImage: [...preve.productImage, uploadImageCloudinary.url]
  //     }
  //   })
  // }

  const onImageChange = async (e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setProductData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }


  const handleDeleteProductImage = async (index) => {
    console.log("image index", index)

    const newProductImage = [...productData.productImage]
    newProductImage.splice(index, 1)

    console.log('prod', newProductImage)

    setProductData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage]
      }
    })

  }
  const formData = new FormData();

  {/**upload product */ }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const uploadProductUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/products` : `http://localhost:3001/products`
    // const formData = new FormData();
    formData.append("product[product_name]", productData.productName);
    formData.append("product[brand_name]", productData.brandName);
    formData.append("product[category]", productData.category);
    formData.append("product[description]", productData.description);
    formData.append("product[price]", productData.price);
    formData.append("product[selling_price]", productData.sellingPrice);
    // formData.append("product[product_image][]", productData.productImage);

console.log('pre ges', productData.productImage)
    productData.productImage.forEach((image, index) => {
      formData.append("product[product_image][]", image);
    });


    console.log('productData', productData)
    console.log('formData', formData)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    const response = await axios.post(uploadProductUrl, formData, {

      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data"

      },

    })


    console.log('response', response)

    if (response.status === 201) {
      toast.success("Product created successfully")
      onClose()
      fetchData()
    }


    if (response.error) {
      toast.error(response?.message)
    }


  }

  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input
            type='text'
            id='productName'
            placeholder='enter product name'
            name='productName'
            value={productData.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />


          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input
            type='text'
            id='brandName'
            placeholder='enter brand name'
            value={productData.brandName}
            name='brandName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select required value={productData.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value={""}>Select Category</option>
            {
              productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>{el.label}</option>
                )
              })
            }
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                {/* <input type='file' id='uploadImageInput' multiple={true} className='hidden' onChange={onImageChange} /> */}
                <input type="file" multiple onChange={onImageChange} accept="image/*" />

              </div>
            </div>
          </label>
          <div>
            {/* {console.log('pro Data', productData)} */}
            {

              productData.productImage.length ? (
                <div className='flex items-center gap-2'>
                  {
                    productData.productImage.map((el, index) => {
                      return (
                        <div className='relative group' key={index}>
                          <img
                            src={el}
                            alt={el}
                            width={80}
                            height={80}
                            className='bg-slate-100 border cursor-pointer'
                            onClick={() => {
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }} />

                          <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                            <MdDelete />
                          </div>
                        </div>

                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-600 text-xs'>*Please upload product image</p>
              )
            }

          </div>

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input
            type='number'
            id='price'
            placeholder='enter price'
            value={productData.price}
            name='price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />


          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='enter selling price'
            value={productData.sellingPrice}
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea
            className='h-28 bg-slate-100 border resize-none p-1'
            placeholder='enter product description'
            rows={3}
            onChange={handleOnChange}
            name='description'
            value={productData.description}
          >
          </textarea>





          <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
        </form>




      </div>



      {/***display image full screen */}
      {/* {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      } */}


    </div>
  )
}

export default UploadProduct


// const handleUpload = async () => {
//   if (selectedFiles.length === 0) {
//     alert("Please select files first!");
//     return;
//   }

//worked but temp files blob...
// const onImageChange = (e) => {
//   const files = Array.from(e.target.files);
//   const imageUrl = files.map((file) => URL.createObjectURL(file));
//   setProductData((prev) => ({
//     ...prev,
//     productImage: [...prev.productImage, imageUrl]
//   }));

// Generate previews
// const imageUrls = files.map((file) => URL.createObjectURL(file));
// setImagePreviews(imageUrls);
// setProductData((preve) => {
//   return {fil
//     ...preve,
//     productImage: [...preve.productImage, image.raw]
//   }
// })
// };



// const handleUploadProduct = async (e) => {
// const file = e.target.files[0]
// const uploadImageCloudinary = await uploadImage(file)

//   setProductData((preve) => {
//     return {
//       ...preve,
//       productImage: [...preve.productImage, image.raw]
//     }
//   })
// }

// signup
// const onImageChange = (e) => {
// setImage({
//   preview: URL.createObjectURL(e.target.files[0]),
//   raw: e.target.files[0]
// })
// const files = Array.from(e.target.files[0]);
// const imageurl = URL.createObjectURL(files)
// const imageUrls = files.map((file) => URL.createObjectURL(file));
// setImagePreviews(imageUrls);
// setProductData((preve) => {
//   console.log('pi', imageurl)
//   return {
//     ...preve,
//     productImage: [...preve.productImage, imageurl]
//   }
// })
//
// }


// here
// in signup
// const handleUploadPic = async (e) => {
//     const file = e.target.files[0]

//     const imagePic = await imageTobase64(file)

//     setData((preve) => {
//         return {
//             ...preve,
//             profilePic: imagePic
//         }
//     })

// const files = Array.from(e.target.files);
// productImages.push(files)
// setProductImages(...productImages, files);/

// setProductImages((prevImages) => [...prevImages, ...files]);
// setProductImages((prevProd) => {
//   console.log("Previous Prods:", prevProd);
//   console.log("New Prod:", files);
//   return [...prevProd, ...files]; // Ensure images are appended correctly
// });

// const previewUrls = files.map(file => URL.createObjectURL(file));
// previewImages.push(previewUrls)
// setPreviewImages(...previewImages, previews);
// setPreviewImages((prevPreviews) => [...prevPreviews, ...previewUrls]);
// setPreviewImages((prevImages) => {
//   console.log("Previous Images:", prevImages);
//   console.log("New Image:", previewUrls);
//   return [...prevImages, ...previewUrls]; // Ensure images are appended correctly
// });

// setRawImages([...rawImages, ...image.raw])
// console.log('rml', rawImages.length)
// const files = Array.from(e.target.files);
// console.log('files', files)
// setSelectedFiles(files); // Store actual files for upload
// console.log('ccc1', selectedFiles.length, imagePreviews.length)
// Generate preview URLs
// const previews = files.map((file) => URL.createObjectURL(file));
// console.log('previews', previews)
// setImagePreviews(previews);
// console.log('ccc2', selectedFiles.length, imagePreviews.length)

// setProductData(
//   product.productImages.push(image.preview)
// )
// setProductData((preve) => {
// console.log('pi', image.raw)
// return {
//   ...preve,
//   productImage: [...preve.productImage, image.preview]
// }

// })


// formData.append("product[product_image][]", previews);
// console.log('image cnt', productData.product_image[].length)
// console.log('formData', formData)

// formData.append("product[product_image][]", productData.productImage);
// selectedFiles.forEach((file) => {
//   formData.append("product[product_image][]", file);
//   console.log('ccc', selectedFiles.length)
// });

{/* <input type="file"
            accept="image/*"
            multiple={false}
            onChange={onImageChange}
          /> */}

{/* <input type="file"
                  accept="image/*"
                  multiple={false}
                  className='hidden'
                  onChange={onImageChange}
                /> */}

                // const onImageChange1 = (e) => {
  //   setImage({
  //     preview: URL.createObjectURL(e.target.files[0]),
  //     raw: e.target.files[0]
  //   })
  //   productImages.push(image.raw)
  //   previewImages.push(image.preview)
  //   console.log('rml-1', productImages.length, productImages)
  //   console.log('rml-2', previewImages.length, previewImages)
  //   setProductData((preve) => {
     
  //     return {
  //       ...preve,
  //       productImage: [...preve.productImage, image.preview]
  //     }
  //   })
  // };

  // const onImageChange2 = (e) => {
  //   setImage({
  //     preview: URL.createObjectURL(e.target.files[0]),
  //     raw: e.target.files[0]
  //   })

  //   setProductData((prev) => {
  //     const updatedImages = [...prev.productImage]; // Create a new copy of the array
  //     updatedImages.push(image.preview); // Push new image to the copied array
  //     console.log('updatedImages', updatedImages)
  //     return {
  //       ...prev,
  //       productImage: updatedImages, // Set the new array
  //     };
  //   });


  // };