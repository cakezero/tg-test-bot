import os
from flask import Flask
from dotenv import load_dotenv
from telegram import InlineKeyboardMarkup, Update, WebAppInfo, InlineKeyboardButton
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackContext
load_dotenv()

TOKEN = os.getenv('TOKEN')
BOT_USERNAME = os.getenv('BOT_USERNAME')

server = Flask(__name__)


# Commands
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
  text = 'Welcome to PayMe, a competition platform meant to rival the betting industry and reward users based on their football knowledge' 
  keyboard = [
    [InlineKeyboardButton("Launch PayMe", web_app=WebAppInfo(url="https://url-goes-here.com"))]
  ]
  reply_markup=InlineKeyboardMarkup(keyboard)
  await update.message.reply_text(text, reply_markup=reply_markup) # type: ignore


async def help(update: Update, context: ContextTypes.DEFAULT_TYPE):
  await update.message.reply_text("Hello, I'm a bot") # type: ignore 

async def connect(update: Update, context: CallbackContext):

  chat_id = update.message.chat_id # type: ignore
  keyboard = [
    [InlineKeyboardButton("Click to connect account", web_app=WebAppInfo(url=f"https://blocverse.com"))]
  ]
  reply_markup = InlineKeyboardMarkup(keyboard)
  await update.message.reply_text("Click the button below to open the Witfora web app", reply_markup=reply_markup) # type: ignore


# Responses
def handle_responses(text):
  print(text)
  '''
    This part is where the whole logic of the bot is being carried out
    The Ai, or anything else you want to add!
  '''
  processed = text.lower()
  if 'hello' in processed:
    return "Hey!"
  elif 'hey' in text:
    return "hello"


# Handle Responses
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
  message_type = update.message.chat.type # type: ignore
  text = update.message.text # type: ignore

  if message_type == 'group':
    if BOT_USERNAME in text: # type: ignore
      new_text = text.replace(BOT_USERNAME, '').strip() # type: ignore
      response = handle_responses(new_text)
    else:
      return
  else:
    response = handle_responses(text)

  await update.message.reply_text(response) # type: ignore



async def error_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
  print(f'Update {update} caused the following error: {context.error}')


def run_bot():
  print("starting Bot...")
  app = Application.builder().token(TOKEN).build() # type: ignore

  app.add_handler(CommandHandler("start", start))
  app.add_handler(CommandHandler("help", help))
  app.add_handler(CommandHandler("connect", connect))


  # messages
  app.add_handler(MessageHandler(filters.TEXT, handle_message))


  # Error
  app.add_error_handler(error_message) # type: ignore


# Fetch messages
  print('Fetching Messages...')
  server.run(host='0.0.0.0', port=5000)
  app.run_polling(poll_interval=2)


if __name__ == "__main__":
  run_bot()
